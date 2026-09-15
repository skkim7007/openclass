// 2026학년도 학부모 공개수업 시간표와 수업 주제표를 반영했습니다.
// 각 학반 배열의 순서는 5교시, 6교시입니다.
const rawTimetable = {
  "1-1":[
    ["기술·가정","1-1 교실","제작 활동 문제해결"],
    ["수학","1-1 교실","정비례, 반비례 그래프"]
  ],
  "1-2":[
    ["수학","1-2 교실","도형의 기초"],
    ["국어","1-2 교실","추론하며 읽기"]
  ],
  "1-3":[
    ["체육A","오션홀","빅발리볼"],
    ["진로","진로활동실","새로 생기는 학과"]
  ],
  "1-4":[
    ["정보","DS3실","컴퓨팅 시스템 동작하기"],
    ["영어","1-4 교실","Unit 6 to 부정사의 명사적 용법"]
  ],
  "1-5":[
    ["사회","1-5 교실","법의 의미와 목적"],
    ["영어","1-5 교실","to부정사 활용"]
  ],
  "1-6":[
    ["국어","1-6 교실","추론하며 읽기"],
    ["도덕","1-6 교실","다문화 사회에서 발생할 수 있는 도덕 문제"]
  ],
  "1-7":[
    ["과학B","1-7 교실","가려지는 태양과 달"],
    ["음악","음악실","리코더 2중주"]
  ],
  "1-8":[
    ["국어","1-8 교실","추론하며 읽기"],
    ["체육A","오션홀","빅발리볼"]
  ],
  "1-9":[
    ["독서","1-9 교실","내가 감독이라면"],
    ["사회","1-9 교실","문화를 이해하는 태도"]
  ],
  "1-10":[
    ["음악","상상나래실","리코더 2중주"],
    ["과학A","과학실2","원래대로 돌아가려는 힘"]
  ],
  "2-1":[
    ["역사","2-7 교실","아시아의 국민 국가 건설 운동"],
    ["국어A","2-8 교실","함께 살아가는 즐거움"]
  ],
  "2-2":[
    ["역사","2-3 교실","제국주의 열강의 침략"],
    ["영어B","2-10 교실","6과 듣기 말하기 연습"]
  ],
  "2-3":[
    ["기술·가정","기술실","제조 기술 문제해결"],
    ["기술·가정","기술실","제조 기술 문제해결"]
  ],
  "2-4":[
    ["미술","미술실2","서양 미술사"],
    ["체육B","오션홀","볼바운스"]
  ],
  "2-5":[
    ["수학","2-5 교실","일차함수의 그래프와 연립일차방정식"],
    ["영어A","2-6 교실","6과 교과서 본문 내용 학습"]
  ],
  "2-6":[
    ["과학B","과학1실","전하를 띠는 이온"],
    ["과학A","2-2 교실","노폐물을 내보내는 배설계"]
  ],
  "2-7":[
    ["국어B","2-4 교실","복합양식 자료를 활용한 글쓰기"],
    ["수학","2-9 교실","삼각형의 외심과 내심"]
  ],
  "2-8":[
    ["영어A","2-10 교실","6과 교과서 본문 내용 활동"],
    ["도덕","2-1 교실","국가와 시민의 바람직한 관계"]
  ],
  "2-9":[
    ["과학A","2-2 교실","세포호흡으로 얻는 에너지"],
    ["과학B","과학1실","전하를 띠는 이온"]
  ],
  "2-10":[
    ["체육A","오션홀","배드민턴"],
    ["음악","상상나래실","칼림바 2중주"]
  ],
  "3-1":[
    ["역사","3-7 교실","대외 침략과 조선 후기 정치 변동"],
    ["수학","3-9 교실","원의 성질"]
  ],
  "3-2":[
    ["국어B","3-8 교실","시집 읽고 해석하기"],
    ["체육A","운동장","티볼"]
  ],
  "3-3":[
    ["영어","3-6 교실","문자도에 대한 글 읽기"],
    ["과학B","과학3실","전기에너지"]
  ],
  "3-4":[
    ["사회","3-3 교실","사람이 만든 삶터, 도시"],
    ["역사","3-7 교실","대외 침략과 조선 후기 정치 변동"]
  ],
  "3-5":[
    ["체육B","무용실","스포츠스태킹"],
    ["수학","3-5 교실","원의 성질"]
  ],
  "3-6":[
    ["기술·가정","가사실","공간 구성 실습하기"],
    ["기술·가정","가사실","공간 구성 실습하기"]
  ],
  "3-7":[
    ["과학B","과학3실","전기에너지"],
    ["체육B","무용실","스포츠스태킹"]
  ],
  "3-8":[
    ["국어A","3-4 교실","문장의 짜임"],
    ["사회","3-3 교실","사람이 만든 삶터, 도시"]
  ],
  "3-9":[
    ["미술","미술실1","전각 이해하기"],
    ["미술","미술실1","전각 제작하기"]
  ],
  "3-10":[
    ["과학A","3-2 교실","노폐물을 내보내는 배설계"],
    ["국어B","3-8 교실","시집 읽고 해석하기"]
  ]
};

const specialRoomFloors = {
  "오션홀":"2층", "진로활동실":"4층", "DS3실":"1층", "음악실":"2층",
  "상상나래실":"3층", "과학실2":"4층", "기술실":"1층", "미술실2":"1층",
  "과학1실":"3층", "과학3실":"4층", "무용실":"2층", "가사실":"1층",
  "미술실1":"2층", "운동장":"야외"
};

function floorFor(room) {
  if (specialRoomFloors[room]) return specialRoomFloors[room];
  const explicit = room.match(/([본별]관\s*)?(\d)층/);
  if (explicit) return `${explicit[2]}층`;
  if (room === "운동장") return "야외";
  const grade = room.match(/^([123])-/)?.[1];
  return grade ? `${Number(grade) + 1}층` : "현장 안내 확인";
}

const timetable = Object.fromEntries(Object.entries(rawTimetable).map(([key, lessons]) => [key,
  lessons.map(([subject, room, topic], index) => ({
    period: index + 5, subject, room, floor: floorFor(room),
    topic
  }))
]));

// 배치도 이미지 위 교실 중심 위치(%). 배치도 수정 시 이 값만 조정하세요.
const mapPositions = {
  "1-1 교실":[48.0,68.9], "1-2 교실":[63.0,68.9], "1-3 교실":[71.1,68.9], "1-4 교실":[78.2,68.9], "1-5 교실":[84.6,68.9], "1-6 교실":[91.0,68.9],
  "1-7 교실":[70.1,53.3], "1-8 교실":[77.6,53.3], "1-9 교실":[84.5,53.3], "1-10 교실":[90.9,53.3],
  "2-1 교실":[47.5,45.0], "2-2 교실":[62.6,45.0], "2-3 교실":[69.4,45.0], "2-4 교실":[76.5,45.0], "2-5 교실":[83.5,45.0], "2-6 교실":[90.6,45.0],
  "2-7 교실":[69.4,31.6], "2-8 교실":[76.5,31.6], "2-9 교실":[83.5,31.6], "2-10 교실":[90.6,31.6],
  "3-1 교실":[47.2,23.4], "3-2 교실":[61.5,23.4], "3-3 교실":[68.6,23.4], "3-4 교실":[75.7,23.4], "3-5 교실":[82.8,23.4], "3-6 교실":[90.1,23.4],
  "3-7 교실":[69.1,8.8], "3-8 교실":[76.2,8.8], "3-9 교실":[83.3,8.8], "3-10 교실":[90.4,8.8],
  "오션홀":[22.9,57.5], "진로활동실":[47.2,14.5], "DS3실":[32.1,76.2], "음악실":[47.5,49.7], "상상나래실":[47.4,28.0],
  "과학실2":[47.2,10.7], "기술실":[51.0,80.2], "미술실2":[87.0,80.2], "과학1실":[47.5,34.3], "과학3실":[47.2,5.1],
  "무용실":[14.8,72.0], "가사실":[74.0,80.2], "미술실1":[25.2,72.0], "운동장":[52.0,99.0]
};

const floorMaps = {
  "1층": { src:"assets/map-1f.png", start:73.61, end:100 },
  "2층": { src:"assets/map-2f.png", start:45.93, end:73.61 },
  "3층": { src:"assets/map-3f.png", start:24.76, end:45.93 },
  "4층": { src:"assets/map-4f.png", start:0, end:24.76 },
  "야외": { src:"assets/map-1f.png", start:73.61, end:100 }
};

// Google Apps Script를 웹 앱으로 배포한 뒤 아래 주소를 교체하세요.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxtFl-WRmI8j2ynhF69mhAce1GUUJlMuEWyOVrt2ltz2S0GW-ip-d-hknYprQDLwHR_Yw/exec";

const finderGrade = document.querySelector("#finderGrade");
const finderClass = document.querySelector("#finderClass");
const feedbackClass = document.querySelector("#feedbackClass");
const feedbackSubject = document.querySelector("#feedbackSubject");
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

feedbackClass.addEventListener("change", () => {
  feedbackSubject.innerHTML = '<option value="">과목 선택</option>';
  const lessons = timetable[feedbackClass.value];
  if (!lessons) {
    feedbackSubject.disabled = true;
    feedbackSubject.firstElementChild.textContent = "학반을 먼저 선택해 주세요";
    return;
  }
  [...new Set(lessons.map(lesson => lesson.subject))]
    .forEach(subject => feedbackSubject.add(new Option(subject, subject)));
  feedbackSubject.disabled = false;
});

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
    const floorMap = floorMaps[link.dataset.floor];
    if (position && floorMap) {
      const banner = document.querySelector("#locationBanner");
      const mapCanvas = document.querySelector("#mapCanvas");
      const mapImage = document.querySelector("#floorMap");
      const mapOpen = document.querySelector("#mapOpen");
      mapImage.src = floorMap.src;
      mapImage.alt = `오션중학교 ${link.dataset.floor} 교실 및 시설 배치도`;
      mapOpen.href = floorMap.src;
      mapCanvas.hidden = false;
      mapOpen.hidden = false;
      document.querySelector("#mapPlaceholder").hidden = true;
      marker.style.left = `${position[0]}%`;
      marker.style.top = `${((position[1] - floorMap.start) / (floorMap.end - floorMap.start)) * 100}%`;
      marker.hidden = false;
      banner.hidden = false;
      document.querySelector("#bannerFloor").textContent = link.dataset.floor;
      document.querySelector("#bannerRoom").textContent = link.dataset.room;
      marker.classList.remove("is-active");
      void marker.offsetWidth;
      marker.classList.add("is-active");
      document.querySelector("#markerLabel").textContent = `${link.dataset.floor} · ${link.dataset.room}`;
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
    feedbackSubject.innerHTML = '<option value="">학반을 먼저 선택해 주세요</option>';
    feedbackSubject.disabled = true;
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
