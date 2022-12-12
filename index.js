/**
 Created by WebStorm IDEA.
 *packageName    :
 * fileName       : index
 * author         : wj
 * date           : 2022/12/10
 * description    : Node.js Puppeteer 패키지를 이용한 웹 크롤링 연습
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022/12/10        wj       최초 생성
 */

/**
참고
https://devscb.tistory.com/70
*/

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless:false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    }); // puppeteer 시작
    const page = await browser.newPage(); // 브라우저 실행
    await page.goto('https://www.naver.com'); // 해당 페이지로 이동
    await page.screenshot({
        path: '1.png', fullPage:true
    });
    await browser.close();  // 브라우저 종료
})();