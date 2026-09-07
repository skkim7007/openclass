// 첨부된 공개수업 시간표를 반영했습니다. 수업 주제는 확정 후 topic만 교체하세요.
const rawTimetable = {
  "1-1":[["사회","1-1"],["도덕","1-1"]], "1-2":[["수학","1-2"],["과학","1-2"]],
  "1-3":[["국어","1-3"],["영어","1-3"]], "1-4":[["도덕","1-4"],["국어","1-4"]],
  "1-5":[["정보","컴퓨터실(본관2층)"],["음악","음악실(본관2층)"]],
  "1-6":[["진로와 직업","진로활동실(본관4층)"],["영어","1-6"]],
  "1-7":[["국어","1-7"],["과학","1-8"]], "1-8":[["과학","1-8"],["독서에세이","도서관(별관3층)"]],
  "1-9":[["과학","DS3실(본관1층)"],["사회","1-9"]], "1-10":[["수학","1-10"],["국어","1-7"]],
  "2-1":[["영어","2-10"],["체육","오션홀(별관2층)"]], "2-2":[["국어","2-8"],["가정","기술실(본관1층)"]],
  "2-3":[["기술","기술실(본관1층)"],["도덕","2-3"]], "2-4":[["체육","오션홀(별관2층)"],["국어","2-4"]],
  "2-5":[["체육","오션홀(별관2층)"],["수학","2-5"]], "2-6":[["영어","2-6"],["역사","2-6"]],
  "2-7":[["과학","과학실1(본관3층)"],["수학","2-9"]], "2-8":[["수학","2-9"],["영어","DS1실(본관1층)"]],
  "2-9":[["역사","2-7"],["과학","과학실1(본관3층)"]], "2-10":[["미술","미술실1(별관2층)"],["국어","2-8"]],
  "3-1":[["과학","3-2"],["역사","3-3"]], "3-2":[["체육","운동장"],["사회","3-7"]],
  "3-3":[["기술","가사실(본관1층)"],["기술","가사실(본관1층)"]], "3-4":[["과학","과학3실(본관4층)"],["국어","3-8"]],
  "3-5":[["수학","상상나래실(본관3층)"],["체육","운동장"]], "3-6":[["영어","3-6"],["체육","운동장"]],
  "3-7":[["영어","3-10"],["국어","3-4"]], "3-8":[["미술","미술실2(본관1층)"],["미술","미술실2(본관1층)"]],
  "3-9":[["체육","무용실(별관2층)"],["수학","3-9"]], "3-10":[["국어","3-8"],["과학","3-2"]]
};

function floorFor(room) {
  const explicit = room.match(/([본별]관\s*)?(\d)층/);
  if (explicit) return `${explicit[1] || ""}${explicit[2]}층`;
  if (room === "운동장") return "야외";
  const grade = room.match(/^([123])-/)?.[1];
  return grade ? `본관 ${Number(grade) + 1}층` : "현장 안내 확인";
}

const timetable = Object.fromEntries(Object.entries(rawTimetable).map(([key, lessons]) => [key,
  lessons.map(([subject, room], index) => ({
    period: index + 5, subject, room, floor: floorFor(room),
    topic: "수업 주제는 당일 상세 안내자료에서 확인해 주세요."
  }))
]));

// Google Apps Script를 웹 앱으로 배포한 뒤 아래 주소를 교체하세요.
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

const finderGrade = document.querySelector("#finderGrade");
const finderClass = document.querySelector("#finderClass");
const feedbackClass = document.querySelector("#feedbackClass");
const resultArea = document.querySelector("#resultArea");
const helper = document.querySelector(".helper");

function addClassOptions(select, grade) {
  select.innerHTML = '<option value="">반 선택</option>';
  if (!grade) return;
  for (let i = 1; i <= 10; i++) select.add(new Option(`${i}반`, i));
}

for (let g = 1; g <= 3; g++) {
  for (let c = 1; c <= 10; c++) feedbackClass.add(new Option(`${g}학년 ${c}반`, `${g}-${c}`));
}

finderGrade.addEventListener("change", () => {
  addClassOptions(finderClass, finderGrade.value);
  finderClass.disabled = !finderGrade.value;
});

document.querySelector("#findButton").addEventListener("click", () => {
  const grade = finderGrade.value;
  const classNo = finderClass.value;
  if (!grade || !classNo) {
    helper.textContent = "학년과 반을 모두 선택해 주세요.";
    helper.style.color = "#c43b3b";
    return;
  }
  helper.textContent = "아래 수업 정보를 확인해 주세요.";
  helper.style.color = "#68748a";
  const lessons = timetable[`${grade}-${classNo}`];
  resultArea.innerHTML = `
    <div class="class-result-header"><h3>${grade}학년 ${classNo}반 수업 안내</h3><span>9/21(월)</span></div>
    <div class="lesson-grid">${lessons.map(lesson => `
      <article class="lesson-card">
        <div class="lesson-top"><span class="period">${lesson.period}교시</span><span class="floor">${lesson.floor}</span></div>
        <h4>${lesson.subject}</h4><div class="room">📍 ${lesson.room}</div>
        <div class="topic"><small>수업 주제</small><p>${lesson.topic}</p></div>
      </article>`).join("")}</div>`;
});

const textarea = document.querySelector("textarea[name='message']");
textarea.addEventListener("input", () => document.querySelector("#charCount").textContent = textarea.value.length);

document.querySelector("#feedbackForm").addEventListener("submit", async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector("#formStatus");
  const button = form.querySelector("button[type='submit']");
  if (GOOGLE_SCRIPT_URL.startsWith("YOUR_")) {
    status.className = "form-status error";
    status.textContent = "관리자가 Google Sheet 연동 주소를 설정해야 합니다.";
    return;
  }
  button.disabled = true;
  button.textContent = "제출 중...";
  status.textContent = "";
  const payload = Object.fromEntries(new FormData(form));
  payload.submittedAt = new Date().toLocaleString("ko-KR");
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    form.reset();
    document.querySelector("#charCount").textContent = "0";
    status.className = "form-status success";
    status.textContent = "소중한 참관록이 제출되었습니다. 감사합니다.";
  } catch (error) {
    status.className = "form-status error";
    status.textContent = "제출하지 못했습니다. 잠시 후 다시 시도해 주세요.";
  } finally {
    button.disabled = false;
    button.innerHTML = "참관록 제출하기 <span>→</span>";
  }
});
