import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const siteUrl = process.env.SITE_URL ?? "http://127.0.0.1:4321";
const chromePath =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = Number(process.env.CHROME_DEBUG_PORT ?? 9300 + (process.pid % 500));
const userDataDir = path.join(os.tmpdir(), `python-course-visual-audit-${process.pid}`);
const logDir = path.join(process.cwd(), ".logs");
const screenshots = [
  { name: "home-desktop-cdp", url: "/", width: 1440, height: 1200, mobile: false },
  { name: "home-mobile-cdp", url: "/", width: 390, height: 1200, mobile: true },
  { name: "prednasky-mobile-cdp", url: "/prednasky/", width: 390, height: 1200, mobile: true },
  { name: "cvicenia-mobile-cdp", url: "/cvicenia/", width: 390, height: 1200, mobile: true },
  { name: "cvicenie-01-desktop-cdp", url: "/cvicenia/01-uvod-ku-pythonu-v-praxi/", width: 1440, height: 1400, mobile: false },
  { name: "cvicenie-01-mobile-cdp", url: "/cvicenia/01-uvod-ku-pythonu-v-praxi/", width: 390, height: 1400, mobile: true },
  { name: "projekt-mobile-cdp", url: "/projekt/", width: 390, height: 900, mobile: true },
  { name: "slide-21-desktop-cdp", url: "/prednasky/01-uvod-ku-pythonu/#21", width: 1440, height: 900, mobile: false },
  { name: "slide-21-mobile-cdp", url: "/prednasky/01-uvod-ku-pythonu/#21", width: 390, height: 900, mobile: true },
  { name: "slide-27-lecture-02-desktop-cdp", url: "/prednasky/02-skriptovanie-automatizacia/#27", width: 1440, height: 900, mobile: false },
  { name: "slide-44-lecture-02-desktop-cdp", url: "/prednasky/02-skriptovanie-automatizacia/#44", width: 1440, height: 900, mobile: false },
  { name: "slide-44-lecture-02-mobile-cdp", url: "/prednasky/02-skriptovanie-automatizacia/#44", width: 390, height: 900, mobile: true }
];
const lecturePaths = ["/prednasky/01-uvod-ku-pythonu/", "/prednasky/02-skriptovanie-automatizacia/"];

if (!fs.existsSync(chromePath)) {
  console.error(`Chrome sa nenašiel: ${chromePath}`);
  process.exit(1);
}

fs.mkdirSync(logDir, { recursive: true });

async function main() {
  const chrome = spawn(
    chromePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userDataDir}`,
      "--window-size=1440,1000",
      "about:blank"
    ],
    { stdio: "ignore" }
  );

  try {
    await waitForChrome();
    const tab = await connectToFirstPage();
    await tab.send("Page.enable");
    await tab.send("Runtime.enable");
    await tab.send("Input.setIgnoreInputEvents", { ignore: false });

    const pageResults = [];
    for (const item of screenshots) {
      await setViewport(tab, item);
      await navigate(tab, "about:blank");
      await navigate(tab, new URL(item.url, siteUrl).href);
      const result = await readPageMetrics(tab);
      pageResults.push({ ...item, ...result });
      await saveScreenshot(tab, `${item.name}.png`);
    }

    const slideAudits = [];
    for (const lecturePath of lecturePaths) {
      await setViewport(tab, { width: 1440, height: 900, mobile: false });
      await navigate(tab, "about:blank");
      await navigate(tab, `${siteUrl}${lecturePath}#1`);
      slideAudits.push(await clickThroughLecture(tab, lecturePath));
    }

    const failures = [];
    for (const result of pageResults) {
      if (result.horizontalOverflow > 1) {
        failures.push(`${result.name}: horizontálne pretečenie ${result.horizontalOverflow}px`);
      }
      if (result.visibleSlides !== null && result.visibleSlides !== 1) {
        failures.push(`${result.name}: viditeľných slajdov ${result.visibleSlides}`);
      }
    }

    for (const slideAudit of slideAudits) {
      failures.push(...slideAudit.failures);
    }

    if (failures.length > 0) {
      for (const failure of failures) console.error(`error: ${failure}`);
      process.exitCode = 1;
    } else {
      const checkedSlides = slideAudits.reduce((sum, audit) => sum + audit.checkedSlides, 0);
      console.log(`Visual audit prešiel: ${pageResults.length} strán/snímok, ${checkedSlides} prekliknutých slajdov.`);
    }

    await tab.close();
  } finally {
    chrome.kill();
    await waitForExit(chrome);
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch (error) {
      console.warn(`warning: Chrome temp adresár sa nepodarilo odstrániť: ${error.message}`);
    }
  }
}

async function waitForChrome() {
  const deadline = Date.now() + 10000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {
      await sleep(150);
    }
  }
  throw new Error("Chrome DevTools sa nespustil v časovom limite.");
}

async function connectToFirstPage() {
  const response = await fetch(`http://127.0.0.1:${port}/json/list`);
  const targets = await response.json();
  const target = targets.find((item) => item.type === "page");
  if (!target?.webSocketDebuggerUrl) throw new Error("Nenašiel sa page target pre Chrome DevTools.");
  return new CdpConnection(target.webSocketDebuggerUrl);
}

async function setViewport(tab, viewport) {
  await tab.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile
  });
}

async function navigate(tab, url) {
  await tab.send("Page.navigate", { url });
  const deadline = Date.now() + 8000;
  while (Date.now() < deadline) {
    const state = await tab.evaluate("document.readyState");
    if (state === "complete") {
      await sleep(250);
      return;
    }
    await sleep(100);
  }
  throw new Error(`Stránka sa nenačítala v časovom limite: ${url}`);
}

async function readPageMetrics(tab) {
  return tab.evaluate(`(() => {
    const doc = document.documentElement;
    const body = document.body;
    const visibleSlides = [...document.querySelectorAll("[data-slide]")]
      .filter((slide) => getComputedStyle(slide).display !== "none").length;
    return {
      innerWidth: window.innerWidth,
      scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
      horizontalOverflow: Math.max(doc.scrollWidth, body.scrollWidth) - window.innerWidth,
      visibleSlides: document.querySelector("[data-slide]") ? visibleSlides : null
    };
  })()`);
}

async function clickThroughLecture(tab, lecturePath) {
  const failures = [];
  let checkedSlides = 0;
  const total = await tab.evaluate(`document.querySelectorAll("[data-slide]").length`);

  for (let index = 1; index <= total; index += 1) {
    const state = await tab.evaluate(`(() => {
      const stage = document.querySelector("[data-stage]");
      const active = document.querySelector("[data-slide].is-active");
      const progress = document.querySelector("[data-progress-text]")?.textContent?.trim() ?? "";
      const visibleSlides = [...document.querySelectorAll("[data-slide]")]
        .filter((slide) => getComputedStyle(slide).display !== "none").length;
      const stageRect = stage?.getBoundingClientRect();
      const activeRect = active?.getBoundingClientRect();
      const outside = active && stageRect
        ? [...active.querySelectorAll("*")].some((element) => {
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0 && (
              rect.left < stageRect.left - 1 ||
              rect.right > stageRect.right + 1 ||
              rect.top < stageRect.top - 1 ||
              rect.bottom > stageRect.bottom + 1
            );
          })
        : true;
      return {
        visibleSlides,
        progress,
        outside,
        stage: stageRect ? { left: stageRect.left, top: stageRect.top, width: stageRect.width, height: stageRect.height } : null,
        active: activeRect ? { width: activeRect.width, height: activeRect.height } : null
      };
    })()`);

    checkedSlides += 1;
    const expected = `${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    if (state.visibleSlides !== 1) failures.push(`${lecturePath} slide ${index}: viditeľných slajdov ${state.visibleSlides}`);
    if (state.progress !== expected) failures.push(`${lecturePath} slide ${index}: progress "${state.progress}", očakávané "${expected}"`);
    if (state.outside) failures.push(`${lecturePath} slide ${index}: obsah mimo plochy slajdu`);
    if (!state.stage) failures.push(`${lecturePath} slide ${index}: chýba stage`);

    if (index < total && state.stage) {
      await click(tab, state.stage.left + state.stage.width * 0.75, state.stage.top + state.stage.height * 0.5);
      await sleep(40);
    }
  }

  return { checkedSlides, failures };
}

async function click(tab, x, y) {
  await tab.send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await tab.send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
}

async function saveScreenshot(tab, fileName) {
  const result = await tab.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  fs.writeFileSync(path.join(logDir, fileName), Buffer.from(result.data, "base64"));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitForExit(process) {
  if (process.exitCode !== null || process.killed) return sleep(400);
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, 1200);
    process.once("exit", () => {
      clearTimeout(timer);
      resolve();
    });
  });
}

class CdpConnection {
  #nextId = 1;
  #pending = new Map();
  #socket;

  constructor(url) {
    this.#socket = new WebSocket(url);
    this.#socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id) return;
      const pending = this.#pending.get(message.id);
      if (!pending) return;
      this.#pending.delete(message.id);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result);
    });
  }

  async send(method, params = {}) {
    await this.#open();
    const id = this.#nextId;
    this.#nextId += 1;
    const promise = new Promise((resolve, reject) => this.#pending.set(id, { resolve, reject }));
    this.#socket.send(JSON.stringify({ id, method, params }));
    return promise;
  }

  async evaluate(expression) {
    const result = await this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text ?? "Runtime.evaluate failed");
    return result.result.value;
  }

  close() {
    this.#socket.close();
  }

  #open() {
    if (this.#socket.readyState === WebSocket.OPEN) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("WebSocket open timeout")), 5000);
      this.#socket.addEventListener(
        "open",
        () => {
          clearTimeout(timeout);
          resolve();
        },
        { once: true }
      );
      this.#socket.addEventListener(
        "error",
        () => {
          clearTimeout(timeout);
          reject(new Error("WebSocket error"));
        },
        { once: true }
      );
    });
  }
}

await main();
