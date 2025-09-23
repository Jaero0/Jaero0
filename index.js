import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `
<div>
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:E34C26,10:DA5B0B,30:C6538C,75:3572A5,100:A371F7&height=100&section=header&text=&fontSize=0" width="100%"/>
</div>

<div>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&duration=1000&pause=1000&color=C1A023&background=8E7D1200&center=true&vCenter=true&multiline=true&random=true&width=900&lines=Dev+who+likes+Bake＆Dev)](https://git.io/typing-svg)

## 🧙About me
#### I'm Unreal Game Developer. Steadily study, learn new skills, and considerate before use skills.
#### Interest on Sofrware development, architecture, game design.
#### BCompSc undergraduate. (2027 graduation)
<br>

[![Solved.ac Profile](http://mazassumnida.wtf/api/v2/generate_badge?boj=accforcsharp)](https://solved.ac/accforcsharp/)

## 🎫 Tech Skills
### Main Tech Skills
<!--cpp-->

<img src="https://img.shields.io/badge/C++-00599C?style=plastic&logo=cplusplus&logoColor=white">
<pr>
<!--unreal-->
<img src="https://img.shields.io/badge/Unreal%20Engine-0E1128?style=plastic&logo=unrealengine&logoColor=white">

### Tools
<img src="https://img.shields.io/badge/Git-F05032?style=plastic&logo=Git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=plastic&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=plastic&logo=Figma&logoColor=white"/>
<img src="https://img.shields.io/badge/Notion-222222?style=plastic&logo=Notion&logoColor=white"/>
<img src="https://img.shields.io/badge/Slack-4A154B?style=plastic&logo=Slack&logoColor=white"/>

## 🦸‍♂️ Github Status

<a href="https://github.com/anuraghazra/github-readme-stats">
    <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Jaero0&hide=ShaderLab&layout=donut&show_icons=true&theme=material-palenight&hide_border=true&bg_color=20232a&icon_color=58A6FF&text_color=fff&title_color=58A6FF&count_private=true&exclude_repo=Face-Transfer-Application" width=38% />
</a>
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img src="https://github-readme-stats.vercel.app/api?username=Jaero0&show_icons=true&theme=material-palenight&hide_border=true&bg_color=20232a&icon_color=58A6FF&text_color=fff&title_color=58A6FF&count_private=true" width=56% />
</a>

<a href="https://github.com/ashutosh00710/github-readme-activity-graph">
    <img src="https://github-readme-activity-graph.vercel.app/graph?username=Jaero0&theme=react-dark&bg_color=20232a&hide_border=true&line=58A6FF&color=58A6FF" width=94%/>
</a>

## Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://gamewindowcoder.tistory.com/rss'); // 본인의 블로그 주소
    
    text += `<ul>`;
    
    // 최신 10개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < 10; i++) {
        const {title, link} = feed.items[i];
        text += `<li><a href="${link}" target="_blank">${title}</a></li>`;
    }

    text += `</ul>`;

    
text += `<img src="https://capsule-render.vercel.app/api?type=waving&color=E9D095&height=130&section=footer" />

</div>`
    
    // README.md 파일 생성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
    console.log('업데이트 완료');
})();

