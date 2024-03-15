const form = document.getElementById("baseForm");
const errorParagraph = document.getElementById("errors");

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const data = new FormData(form);
    const payload = {}

    data.forEach((value, key)=>payload[key] = value)

    fetch('/login', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json()).then((res)=>{
        console.log(res);
        console.log("COOKIE", document.cookie)
    })

})

function callCurrent(){
    fetch('/current')
    .then(res=>{ console.log("STATUS",res.status);  return res.json()}).then((res)=>{
        if(res.error){
            errorParagraph.innerHTML = res.error
        }
    })

}