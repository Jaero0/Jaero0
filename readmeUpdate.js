import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

// ----- [1] 고정 영역: 자기소개, 기술 스택 등으로 커스텀 -----
const staticContent = `
# Graphics Blog

`;

// ----- [2] 자동 갱신 영역: 블로그 RSS 읽어서 최신 글 목록 추가 -----
const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  let blogSection = "";

  try {
  	// ✅ 아래 parseURL("") 안에 본인의 블로그 rss 페이지 주소를 입력
    const feed = await parser.parseURL("https://v2.velog.io/rss/vfx_master");
    const latestPostsCount = 10; // 최신 글을 몇 개 가져올지

    for (let i = 0; i < latestPostsCount && i < feed.items.length; i++) {
      const { title, link, pubDate } = feed.items[i];
      console.log(`${i + 1}. ${title} (${link})`);
      blogSection += `${i+1}. `;
      blogSection += `<a href="${link}">${title}</a></br>\n`;

      const formattedDate = pubDate
          ? new Date(pubDate).toISOString().slice(0, 10) // "YYYY-MM-DD" 형식으로 변환
          : "날짜 정보 없음";

      blogSection += `, <a href="${link}">${title}</a> (${formattedDate})</br>\n`;
    }
  } catch (error) {
    console.error("RSS 파싱 중 오류 발생:", error);
    blogSection += "블로그 글을 불러오지 못했습니다.\n";
  }

  // ----- [3] 파일 작성 -----
  const finalContent = staticContent + blogSection;
  writeFileSync("README.md", finalContent, "utf8");

  console.log("README 업데이트 완료");
})();
