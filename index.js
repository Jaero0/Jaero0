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


## Github Status

<a href="https://github.com/anuraghazra/github-readme-stats">
    <img src="https://readme-jaero0.vercel.app/api/top-langs/?username=Jaero0&hide=ShaderLab&layout=compact&show_icons=true&theme=material-palenight&hide_border=true&bg_color=20232a&icon_color=58A6FF&text_color=fff&title_color=58A6FF&count_private=true&exclude_repo=Face-Transfer-Application" width=38% />
</a>
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img src="https://readme-jaero0.vercel.app/api?username=Jaero0&show_icons=true&theme=merko&hide_border=true&bg_color=20232a&icon_color=58A6FF&text_color=fff&title_color=58A6FF&count_private=true" width=56% />
</a>

<a href="https://github.com/ashutosh00710/github-readme-activity-graph">
    <img src="https://github-readme-activity-graph.vercel.app/graph?username=Jaero0&theme=rogue" width=94%/>
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

