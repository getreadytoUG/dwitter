import express from "express";

const router = express.Router();

let tweets = [
    {
        id: "1",
        text: "안녕하세요!",
        createdAt: Date.now().toString(),
        name: "김사과",
        username: "apple",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU"
    },
    {
        id: "2",
        text: "반갑습니다!",
        createdAt: Date.now().toString(),
        name: "이메론",
        username: "melon",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU"
    },
    {
        id: "3",
        text: "잘부탁드립니다!",
        createdAt: Date.now().toString(),
        name: "반하나",
        username: "banana",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU"
    }
];

// GET / tweets
// GET / tweets?username=:username
router.get("/", (req, res, next) => {
    const username = req.query.username;            // ? 로 받아오는건 query 문 -> {username: ":username"} 형태로 받아옴
    const data = username                           // 변수 = 조건식 ? 참 : 거짓 
        ? tweets.filter((tweet) => tweet.username ===  username )
        : tweets ;
    res.status(200).json(data);
});

// GET / tweets/:id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `Tweet id(${id}) not found`});
    }
})

// POST / tweets 
router.post("/", (req, res, next) => {              
    const { text, name, username } = req.body;      // post 는 body 에 감싸져서 받아지기 때문에 이 구문 가능
    const tweet = {
        id: "10",
        text,                                       // key 와 value 의 이름이 같다면 생략이 가능
        createdAt: Date.now().toString(),
        name,
        username
    };
    tweets = [tweet, ...tweets];                    // 복사(메모리는 달라짐) => 수정을 해도 격리성이 보존
    res.status(201).json(tweets);
})


// PUT / tweet/:id          // find로 찾고
router.put("/:id", (req, res, next) => {
    // const id = req.params.id;
    // const tweet = tweets.find((tweet) => tweet.id === id);
    // if (tweet) {
    //     tweet.text = "수정된 글입니다.";
    //     res.status(200).json(tweet);
    // }else{
    //     res.status(404).json({message: `Tweet id(${id}) not found`});
    // }
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((text) => tweet.id === id);
    if (tweet){
        tweet.text = text;
        res.status(200).json(tweet);
    }
    else{
        res.status(404).json({message: `Tweet id(${id}) not found`}); 
    }
});

// DELETE / tweets/:id      // filter로 거르고
router.delete("/:id", (req, res, next) => {
    // const id = req.params.id;
    // const tweet = tweets.find((tweet) => tweet.id === id);
    // if ( tweet ){
    //     const data = tweets.filter((tweet) => tweet.id !== id)
    //     res.status(200).json(data)
    // } 
    // else{
    //     res.status(404).json({message: `Tweet id(${id}) not found`});
    // }
    const id = req.params.id;
    tweets = tweets.filter((tweet) => tweet.id !== id);
    res.sendStatus(204);
});

export default router;