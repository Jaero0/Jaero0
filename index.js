import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `
## About  me
#### Unity Game Developer.
#### Interest on Architecture, game design and philosophy
#### Basically reading, playing, thinking and writing
#### BCompSc undergraduate
<br>

[![Solved.ac Profile](http://mazassumnida.wtf/api/v2/generate_badge?boj=accforcsharp)](https://solved.ac/accforcsharp/)

## Tech Skills
### Main Tech Skills

[![My Skills](https://skillicons.dev/icons?i=unity,cs,cpp,git,github)](https://skillicons.dev)


## Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    // tistory : https://gamewindowcoder.tistory.com/rss
    // velog : https://v2.velog.io/rss/vfx_master
    const feed = await parser.parseURL('https://v2.velog.io/rss/vfx_master'); // 본인의 블로그 주소
    
    text += `<ul>`;
    text += `<li><a href="https://gamewindowcoder.tistory.com/entry/%EB%B2%A8%EB%A1%9C%EA%B7%B8%EB%A1%9C-%EC%9D%B4%EB%8F%99" target="_blank">벨로그로 이동~~</a></li>`;
    
    // 최신 10개의 글의 제목과 링크를 가져온 후 text에 추가
    if(feed.items.length > 10)
    {
        for (let i = 0; i < 10; i++) 
        {
            const {title, link} = feed.items[i];
            text += `<li><a href="${link}" target="_blank">${title}</a></li>`;
        }
    }
    else
    {
        for (let i = 0; i < feed.items.length; i++) 
        {
            const {title, link} = feed.items[i];
            text += `<li><a href="${link}" target="_blank">${title}</a></li>`;
        }
    }
    

    text += `</ul>`;

    
text += `

</div>`
    
    // README.md 파일 생성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
    console.log('업데이트 완료');
})();

