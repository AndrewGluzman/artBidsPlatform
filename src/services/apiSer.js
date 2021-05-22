// export const URL_API = "http://monkeys.co.il";

 let myApi = "http://localhost:3004";
if(!window.location.href.includes("localhost:")){
  // say that its in real service:
  myApi = "https://my-market2025.herokuapp.com"
}

export const URL_API = myApi;

export const doApiGet = async (_url) => {
  try {
    let resp = await fetch(_url);
    let data = await resp.json();
    return data;
  }
  catch (err) {
    console.log(err);
    alert("there problem , come back tommrow!")
    return err;
  }
}



export const doApiMethod = async (_url, _method, _body) => {
  try {
    let resp = await fetch(_url, {
      method: _method,
      body: JSON.stringify(_body),
      headers: {
        'auth-token': localStorage["tok"],
        'content-type': "application/json"
      }
    })
    let data = await resp.json();
    return data;
  }
  catch (err) {
    console.log(err);
    alert("there problem , come back tommrow!")
    return err;
  }
}