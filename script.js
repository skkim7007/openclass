// 첨부된 공개수업 시간표를 반영했습니다. 수업 주제는 확정 후 topic만 교체하세요.
const rawTimetable = {
  "1-1":[["기가","1-1 교실"],["수학","1-1 교실"]], "1-2":[["수학","1-2 교실"],["국어","1-2 교실"]],
  "1-3":[["체육A","오션홀"],["진로","진로활동실"]], "1-4":[["정보","DS3실"],["영어","1-4 교실"]],
  "1-5":[["사회","1-5 교실"],["영어","1-5 교실"]], "1-6":[["국어","1-6 교실"],["도덕","1-6 교실"]],
  "1-7":[["과학B","1-7 교실"],["음악","음악실"]], "1-8":[["국어","1-8 교실"],["체육A","오션홀"]],
  "1-9":[["독서","1-9 교실"],["사회","1-9 교실"]], "1-10":[["음악","상상나래실"],["과학A","과학실2"]],
  "2-1":[["역사","2-7 교실"],["국어A","2-8 교실"]], "2-2":[["역사","2-3 교실"],["영어B","2-10 교실"]],
  "2-3":[["기가","기술실"],["기가","기술실"]], "2-4":[["미술","미술실2"],["체육B","오션홀"]],
  "2-5":[["수학","2-5 교실"],["영어A","2-6 교실"]], "2-6":[["과학B","과학1실"],["과학A","2-2 교실"]],
  "2-7":[["국어B","2-4 교실"],["수학","2-9 교실"]], "2-8":[["영어A","2-10 교실"],["도덕","2-1 교실"]],
  "2-9":[["과학A","2-2 교실"],["과학B","과학1실"]], "2-10":[["체육A","오션홀"],["음악","상상나래실"]],
  "3-1":[["역사","3-7 교실"],["수학","3-9 교실"]], "3-2":[["국어B","3-8 교실"],["체육A","운동장"]],
  "3-3":[["영어","3-6 교실"],["과학B","과학3실"]], "3-4":[["사회","3-3 교실"],["역사","3-7 교실"]],
  "3-5":[["체육B","무용실"],["수학","3-5 교실"]], "3-6":[["기가","가사실"],["기가","가사실"]],
  "3-7":[["과학B","과학3실"],["체육B","무용실"]], "3-8":[["국어A","3-4 교실"],["사회","3-3 교실"]],
  "3-9":[["미술","미술실1"],["미술","미술실1"]], "3-10":[["과학A","3-2 교실"],["국어B","3-8 교실"]]
};

const specialRoomFloors = {
  "오션홀":"별관 2층", "진로활동실":"본관 4층", "DS3실":"본관 1층", "음악실":"본관 2층",
  "상상나래실":"본관 3층", "과학실2":"본관 4층", "기술실":"본관 1층", "미술실2":"본관 1층",
  "과학1실":"본관 3층", "과학3실":"본관 4층", "무용실":"별관 2층", "가사실":"본관 1층",
  "미술실1":"별관 2층", "운동장":"야외"
};

function floorFor(room) {
  if (specialRoomFloors[room]) return specialRoomFloors[room];
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

// 배치도 이미지 위 교실 중심 위치(%). 배치도 수정 시 이 값만 조정하세요.
const mapPositions = {
  "1-1 교실":[48,70], "1-2 교실":[63,70], "1-3 교실":[70,70], "1-4 교실":[77,70], "1-5 교실":[84,70], "1-6 교실":[91,70],
  "1-7 교실":[68,54], "1-8 교실":[76,54], "1-9 교실":[84,54], "1-10 교실":[91,54],
  "2-1 교실":[48,46], "2-2 교실":[63,46], "2-3 교실":[70,46], "2-4 교실":[77,46], "2-5 교실":[84,46], "2-6 교실":[91,46],
  "2-7 교실":[68,33], "2-8 교실":[76,33], "2-9 교실":[84,33], "2-10 교실":[91,33],
  "3-1 교실":[48,25], "3-2 교실":[63,25], "3-3 교실":[70,25], "3-4 교실":[77,25], "3-5 교실":[84,25], "3-6 교실":[91,25],
  "3-7 교실":[68,9], "3-8 교실":[76,9], "3-9 교실":[84,9], "3-10 교실":[91,9],
  "오션홀":[21,56], "진로활동실":[48,13], "DS3실":[31,78], "음악실":[57,50], "상상나래실":[48,28],
  "과학실2":[48,10], "기술실":[50,82], "미술실2":[87,82], "과학1실":[48,37], "과학3실":[48,4],
  "무용실":[18,68], "가사실":[71,82], "미술실1":[21,68], "운동장":[70,88]
};

// Google Apps Script를 웹 앱으로 배포한 뒤 아래 주소를 교체하세요.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxtFl-WRmI8j2ynhF69mhAce1GUUJlMuEWyOVrt2ltz2S0GW-ip-d-hknYprQDLwHR_Yw/exec";

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
    <div class="class-result-header"><h3>${grade}학년 ${classNo}반 수업 안내</h3><span>2026. 9. 21.(월)</span></div>
    <div class="lesson-grid">${lessons.map(lesson => `
      <article class="lesson-card">
        <div class="lesson-top"><span class="period">${lesson.period}교시</span><span class="floor">${lesson.floor}</span></div>
        <h4>${lesson.subject}</h4><div class="room">📍 ${lesson.room}</div>
        <div class="topic"><small>수업 주제</small><p>${lesson.topic}</p></div>
        <a class="map-link" href="#school-map" data-floor="${lesson.floor}" data-room="${lesson.room}">지도에서 위치 보기 <span>→</span></a>
      </article>`).join("")}</div>`;

  resultArea.querySelectorAll(".map-link").forEach(link => link.addEventListener("click", () => {
    document.querySelector("#selectedFloor").textContent = `${link.dataset.floor} · ${link.dataset.room}`;
    const marker = document.querySelector("#mapMarker");
    const position = mapPositions[link.dataset.room];
    if (position) {
      marker.style.left = `${position[0]}%`;
      marker.style.top = `${position[1]}%`;
      marker.hidden = false;
      marker.classList.remove("is-active");
      void marker.offsetWidth;
      marker.classList.add("is-active");
      document.querySelector("#markerLabel").textContent = link.dataset.room;
    }
  }));
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
