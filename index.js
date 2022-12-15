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
 * 2022/12/15        wj       네이버 자동 로그인 기능 추가
 * 2022/12/16        wj       퍼피티어 함수 연습 및 마무리
 */

/**
참고
 https://devscb.tistory.com/70
 https://wickedmagica.tistory.com/144
 https://mycodings.fly.dev/blog/2022-07-30-how-to-handle-xpath-in-puppeteer
 */

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless:false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

    }); // puppeteer 시작
    // const pages = await browser.newPage()
    // const pages = await browser.pages()
    const page = (await browser.pages())[0];//첫 번째 탭
    try{
        await page.goto('https://naver.com'); // 해당 페이지로 이동
    }catch (e) {
        const errorMsg = '오류 발생! \n 홈 페이지에 연결할 수 없습니다. 다시 확인 해주세요.'
        throw Error('브라우저를 실행할 수 없습니다: ' + e);
        console.log(errorMsg, e);
    }

    await page.bringToFront(); //탭 전환
    await page.setViewport({
        width: 1280, height: 1024
    });
    //await page.waitForNavigation();
    await page.waitForSelector("#account > a");
    try {
        await page.click("#account > a");
    } catch (e) {
        let errorMsg = '오류 발생! \n 클릭할 수 없습니다.'
        console.log(errorMsg, e);
    }
    try {
        await page.$x("/html/body/div[1]/div[2]/div/div[1]/form/ul/li/div/div[1]/div[1]/input");
        await page.type("#id", "tt");
        await page.$x("/html/body/div[1]/div[2]/div/div[1]/form/ul/li/div/div[1]/div[2]/input");
        await page.type("#pw", "t");
    } catch (e) {
        let errorMsg = '오류 발생! \n 입력불가!'
        console.log(errorMsg, e);
    }
    await page.goto("https://google.com");
    await page.goBack();
    await page.reload();
    await page.goForward();


    await page.screenshot({
        path: 'Screenshot/1.png', fullPage:false
    });
    //await browser.close();  // 브라우저 종료
})();