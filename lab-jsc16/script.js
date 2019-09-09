var butt = document.querySelector('button');

butt.addEventListener('click', reqFun);



function reqFun() {
  var xhr = new XMLHttpRequest();
  let url = 'https://jsonplaceholder.typicode.com';
  // let url = 'https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022__340.jpg';
  xhr.open('GET', url);

  let resp;

  if (localStorage.getItem('ourData')) {
    resp = JSON.parse(localStorage.getItem('ourData'));
    buildPage(resp);
  } else {
    try {
      xhr.send();
      xhr.onload = function() {
        localStorage.setItem('ourData', xhr.response);
        resp = JSON.parse(xhr.response);
        buildPage(resp);
      }
    } catch (e) {
      alert(e.name);
    }
  }

  function buildPage(massObj) {
    for (let i = 0; i < massObj.length; i++) {
      (function(j) {
        setTimeout(function() {
          let {id, title, completed: checkBox} = massObj[j];
          let cont = document.createElement('div');
          cont.classList.add('cont');
          let fLine = document.createElement('div');
          let sLine = document.createElement('div');
          sLine.style.fontWeight = 'bold';
          sLine.style.textAlign = 'center';
          let chk = document.createElement('input');
          chk.setAttribute('type', 'checkbox');
          chk.disabled = true;

          fLine.innerHTML = `User ID - ${id}`;
          sLine.innerHTML = `${title}`;
          if (checkBox == true) {
            chk.checked = true;
          }
          // fLine.innerHTML = `User ID - ${resp[j].userId}`;
          // sLine.innerHTML = `${resp[j].title}`;
          // if (resp[j].completed == true) {
          //   chk.checked = true;
          // }
          cont.append(fLine);
          cont.append(sLine);
          cont.append(chk);
          document.body.append(cont);
        }, 1000*i);
      })(i);
    }
  }

}
