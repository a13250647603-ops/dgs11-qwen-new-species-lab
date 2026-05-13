const screens = Array.from(document.querySelectorAll(".screen"));
const stepNow = document.querySelector("#stepNow");
const tools = Array.from(document.querySelectorAll(".tool"));
const missionInput = document.querySelector("#missionInput");
const speciesName = document.querySelector("#speciesName");
const missionSummary = document.querySelector("#missionSummary");
const shareTool = document.querySelector("#shareTool");
const shareSpecies = document.querySelector("#shareSpecies");
const shareMission = document.querySelector("#shareMission");

const stepMap = {
  intro: "01",
  choose: "02",
  input: "03",
  evolve: "04",
  result: "05",
  share: "06",
  brand: "07"
};

const state = {
  tool: "笔记",
  species: "洞察记录体",
  mission: missionInput.value
};

function setScreen(id) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.id === id);
  });
  stepNow.textContent = stepMap[id] || "01";
  document.querySelector(".app").dataset.screen = id;
  if (id === "result" || id === "share" || id === "brand") {
    syncResult();
  }
}

function syncResult() {
  state.mission = missionInput.value.trim() || "帮我把一个目标拆成今天能执行的任务";
  speciesName.textContent = state.species;
  missionSummary.textContent = `围绕“${state.mission}”，拆出清晰交付物和行动顺序。`;
  shareTool.textContent = state.tool;
  shareSpecies.textContent = state.species;
  shareMission.textContent = state.mission;
}

tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    tools.forEach((item) => item.classList.remove("selected"));
    tool.classList.add("selected");
    state.tool = tool.dataset.tool;
    state.species = tool.dataset.species;
  });
});

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    setScreen(button.dataset.next);
  });
});

document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", () => {
    setScreen(button.dataset.back);
  });
});

document.querySelectorAll("[data-sample]").forEach((button) => {
  button.addEventListener("click", () => {
    missionInput.value = button.dataset.sample;
    missionInput.focus();
  });
});

setScreen("intro");
