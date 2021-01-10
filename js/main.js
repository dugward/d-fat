import { globesList, oscarsList, spiritList, masterList } from "./lists.js";

history.pushState(null, null, null);

var firebaseConfig = {
  apiKey: "AIzaSyCDObBl4mknVHOzlkaDLAPslVkKNngS8-s",
  authDomain: "d-fat-92801.firebaseapp.com",
  projectId: "d-fat-92801",
  storageBucket: "d-fat-92801.appspot.com",
  messagingSenderId: "724911341517",
  appId: "1:724911341517:web:832f3e98e0d5f5662bce84",
  measurementId: "G-R29SVRPRC7",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
var anonCount = 0;
function emptyLocal() {
  var empty = [];
  localStorage.setItem("watched", JSON.stringify(empty));
  local = [];
}

if (JSON.parse(localStorage.getItem("watched")) == null) {
  emptyLocal();
}

if (JSON.parse(localStorage.getItem("anoncount")) == null) {
  localStorage.setItem("anoncount", JSON.stringify(0));
}

// functions for flashing the login button

function onState() {
  document.getElementById("loginButton").style.backgroundColor =
    "rgb(175, 211, 175)";
}
function offState() {
  document.getElementById("loginButton").style.backgroundColor = "";
}

//what to do on page load

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 900; i < 4000; i = i + 900) {
    setTimeout(onState, i);
    setTimeout(offState, i + 450);
  }
});

//The login button
var provider = new firebase.auth.GoogleAuthProvider();

//Close the popup

document
  .getElementsByClassName("close")[0]
  .addEventListener("click", function () {
    document.getElementById("loginWarning").style.display = "none";
  });

// const signOut = firebase.auth().signOut();

const loggo = document.getElementById("loginButton");

var local = JSON.parse(localStorage.getItem("watched"));

var userInfo;
var userID;
var userName;
var userDoc;
var dbWatched = [];
var photoUrl;
var loggedIn = 0;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    document.getElementById("spinner").style.display = "block";
    loggo.classList.add("clicked");
    loggo.classList.remove("unclicked");
    loggo.innerText = "Logout";
    loggedIn = 1;
    console.log("signed in");
    userInfo = firebase.auth().currentUser;
    // console.log(userInfo);
    userID = userInfo.uid;
    // console.log(userID);
    userName = userInfo.displayName;
    photoUrl = userInfo.photoURL;
    console.log(userName);
    userDoc = db.collection("users").doc(userID);
    userDoc.get().then(function (doc) {
      if (doc.exists) {
        dbWatched = doc.data().watched;

        if (local.length >= 1) {
          var comboList = local.concat(dbWatched);
          var filteredCombo = comboList.filter(
            (value, index) => comboList.indexOf(value) === index
          );
          userDoc.set(
            {
              watched: filteredCombo,
            },
            { merge: true }
          );
          dbWatched = filteredCombo;
        } else {
        }
      } else {
        if (local.length >= 1) {
          userDoc.set({
            watched: local,
            name: userName,
          });
        } else {
          db.collection("users").doc(userID).set({
            watched: [],
            name: userName,
          });
        }
      }
      document.getElementById("spinner").style.display = "none";
      putUpPosters();
      document.getElementsByClassName(
        "profilePic"
      )[0].innerHTML = `<img src="${photoUrl}" alt="profile pic" class="profilePicture">`;
      console.log(doc.data());
    });
  } else {
    loggo.classList.add("unclicked");
    loggo.classList.remove("clicked");
    loggo.innerText = "Login";
    loggedIn = 0;
    console.log("signed out");
    putUpPosters();
    document.getElementsByClassName("profilePic")[0].innerHTML = "";
  }
});

loggo.addEventListener("click", function () {
  if (loggedIn == 1) {
    firebase.auth().signOut();
    emptyLocal();
    dbWatched = [];
  } else {
    firebase.auth().signInWithRedirect(provider);
  }
});
let pageState = 0;
document.getElementById("title").addEventListener("click", function () {
  if (pageState == 1) {
    backToMovies();
  }
});

var leaders = document.getElementById("leaders");
var leaderslink = document.getElementById("leaderlink");
var sweep = document.getElementsByClassName("sweep");

function backToMovies() {
  leaders.style.display = "none";
  leaderslink.classList.remove("open");
  leaderslink.classList.add("closed");
  leaderslink.innerText = "The Leader Board";
  for (let i = 0; i < sweep.length; i++) {
    sweep[i].style.display = "block";
  }
  pageState = 0;
  history.pushState(null, null, null);
}
leaderslink.addEventListener("click", function () {
  if (leaderslink.classList.contains("closed") == true) {
    leaders.style.display = "block";
    leaderslink.classList.remove("closed");
    leaderslink.classList.add("open");
    leaderslink.innerText = "Back";
    for (let i = 0; i < sweep.length; i++) {
      sweep[i].style.display = "none";
    }
    pageState = 1;
    history.replaceState(null, null, null);
    document.getElementById("title").style.cursor = "pointer";
    //update leadcers bars

    document.getElementById(
      "oscarsList"
    ).innerHTML = `<div class="row leadersTitle"><h4>IndieWire</h4></div>`;
    //
    db.collection("users")
      .orderBy("oscars", "desc")
      .get()
      .then(function (x) {
        x.forEach(function (doc) {
          var userData = doc.data();
          document.getElementById("oscarsList").insertAdjacentHTML(
            "beforeend",
            `            <div class="row leaderrow">
                          <div class="leadername">${userData.name}</div>
                          <div class="myProgress leaderbar">
                            <div class="myBar" style="width:${userData.oscars}%;">${userData.oscars}%</div>
                          </div>
                        </div>`
          );
        });
      });
    //
    document.getElementById(
      "globesList"
    ).innerHTML = `<div class="row leadersTitle"><h4>Variety</h4></div>`;
    //
    db.collection("users")
      .orderBy("globes", "desc")
      .get()
      .then(function (x) {
        x.forEach(function (doc) {
          var userData = doc.data();
          document.getElementById("globesList").insertAdjacentHTML(
            "beforeend",
            `            <div class="row leaderrow">
                      <div class="leadername">${userData.name}</div>
                      <div class="myProgress leaderbar">
                        <div class="myBar" style="width:${userData.globes}%;">${userData.globes}%</div>
                      </div>
                    </div>`
          );
        });
      });
    //
    document.getElementById(
      "spiritList"
    ).innerHTML = `<div class="row leadersTitle"><h4>Best 50</h4></div>`;
    //
    db.collection("users")
      .orderBy("spirits", "desc")
      .get()
      .then(function (x) {
        x.forEach(function (doc) {
          var userData = doc.data();
          document.getElementById("spiritList").insertAdjacentHTML(
            "beforeend",
            `            <div class="row leaderrow">
                        <div class="leadername">${userData.name}</div>
                        <div class="myProgress leaderbar">
                          <div class="myBar" style="width:${userData.spirits}%;">${userData.spirits}%</div>
                        </div>
                      </div>`
          );
        });
      });
  } else {
    backToMovies();
  }
});

window.addEventListener("popstate", function () {
  if (pageState == 1) {
    backToMovies();
  }
});

// Here is our list made by toggling buttons

var toggleList = [];

// console.log(toggleList);

//Make the check buttons listen for a click, then if they are not clicked, add 'checked' to class list. If they are not, remove checked.

var checks = document.querySelectorAll(".list");

for (let i = 0; i < checks.length; i++) {
  checks[i].addEventListener("click", () => {
    if (checks[i].classList.contains("checked") == true) {
      if (checks[i].classList.contains("morelist") == true) {
        checks[i].classList.remove("checked");
        var checkmark = checks[i].getElementsByClassName("material-icons");
        checkmark[0].style.display = "none";

        document.getElementById("more").classList.remove("checked");
        document
          .getElementById("more")
          .getElementsByClassName("material-icons")[0].style.display = "none";
        putUpPosters();
      } else {
        checks[i].classList.remove("checked");
        var checkmark = checks[i].getElementsByClassName("material-icons");
        checkmark[0].style.display = "none";
        putUpPosters();
      }
    } else {
      if (checks[i].classList.contains("morelist") == true) {
        checks[i].insertAdjacentHTML(
          "afterbegin",
          `<span class="material-icons">
            done 
            </span> `
        );
        checks[i].classList.add("checked");
        document.getElementById("more").insertAdjacentHTML(
          "afterbegin",
          `<span class="material-icons">
                done 
                </span> `
        );
        document.getElementById("more").classList.add("checked");
        putUpPosters();
      } else {
        checks[i].classList.add("checked");
        checks[i].insertAdjacentHTML(
          "afterbegin",
          `<span class="material-icons">
            done 
            </span> `
        );
        putUpPosters();
      }
    }
  });
}
//Function for clearing the movies div
function clearMovies() {
  document.getElementById("movies").innerHTML = "";
}

//Putting up the posters giant function

function putUpPosters() {
  //   console.log(`At poster putup, dbWatched=${dbWatched} `);
  //Check for checked in buttons and if there, add their list to toggleList

  var checked = document.querySelectorAll(".checked");
  toggleList = [];
  var displayList = [];
  clearMovies();
  //console.log(checked.length);

  for (let i = 0; i < checked.length; i++) {
    if (checked[i].id == "oscars") {
      toggleList = toggleList.concat(oscarsList);
    }
    if (checked[i].id == "globes") {
      toggleList = toggleList.concat(globesList);
    }
    if (checked[i].id == "spirits") {
      toggleList = toggleList.concat(spiritList);
    }

    //Cut out the dupes
    displayList = toggleList.filter(
      (value, index) => toggleList.indexOf(value) === index
    );
    //console.log(displayList);
  }
  var bar = document.getElementsByClassName("myBar");
  function updateBar() {
    if (loggedIn == 1) {
      if (typeof dbWatched == "undefined") {
        var y = 0;
      } else {
        var y = dbWatched.filter((element) => displayList.includes(element));
      }
    } else {
      var y = local.filter((element) => displayList.includes(element));
    }

    var watchedRatio = Math.round((y.length / displayList.length) * 100);

    if (isNaN(watchedRatio) == false) {
      bar[0].style.width = `${watchedRatio}%`;
      bar[0].innerText = `${watchedRatio}%`;
    } else {
      bar[0].innerText = "0%";
      bar[0].style.width = "0%";
    }
  }

  //put the poster into the div
  if (displayList.length >= 1) {
    for (let i = 0; i < displayList.length; i++) {
      const fetchPromise = fetch(
        `https://api.themoviedb.org/3/movie/${displayList[i]}?api_key=b737a09f5864be7f9f38f1d5ad71c151&language=en-US`
      );
      fetchPromise
        .then((response) => {
          return response.json();
        })
        .then((details) => {
          let poster = details.poster_path;
          let id = details.id;
          let title = details.original_title;

          //   console.log(poster);
          //   console.log(id);
          var h = document.getElementById("movies");
          if (loggedIn == 1) {
            if (typeof dbWatched == "undefined") {
              var x = [];
            } else {
              var x = dbWatched;
            }
          } else {
            if (typeof local == "undefined") {
              var x = [];
            } else {
              var x = local;
            }
          }
          if (x.includes(id) == true) {
            h.insertAdjacentHTML(
              "beforeend",
              `<div class="movie seen"  id="${id}">
                    <img src="https://image.tmdb.org/t/p/w500${poster}" alt="${title}" id="poster" class="image"/> <span class="material-icons circlecheck">
                    check_circle_outline
                    </span><div class="movieTitle"><a href="https://www.themoviedb.org/movie/${id}">${title}</a></div>
                    </div>`
            );
          } else {
            h.insertAdjacentHTML(
              "beforeend",
              `<div class="movie unseen"  id="${id}">
                    <img src="https://image.tmdb.org/t/p/w500${poster}" alt="${title}" id="poster" class="image"/> <span class="material-icons circlecheck">
                    check_circle_outline
                    </span><div class="movieTitle"><a href="https://www.themoviedb.org/movie/${id}">${title}</a></div>
                    </div>`
            );
          }

          updateBar();

          var j = h.lastElementChild;

          j.getElementsByClassName("image")[0].addEventListener(
            "click",
            function () {
              if (j.classList.contains("unseen") == true) {
                j.classList.remove("unseen");
                j.classList.add("seen");
                if (loggedIn == 1) {
                  // console.log(parseInt(j.id, 10));
                  // console.log(dbWatched);
                  dbWatched = dbWatched.concat(parseInt(j.id, 10));
                  userDoc.set(
                    {
                      watched: dbWatched,
                    },
                    { merge: true }
                  );
                } else {
                  var anoncount = JSON.parse(localStorage.getItem("anoncount"));
                  anoncount++;
                  if (anoncount == 2) {
                    document.getElementById("loginWarning").style.display =
                      "block";
                    localStorage.setItem("anoncount", JSON.stringify(3));
                  } else {
                    localStorage.setItem(
                      "anoncount",
                      JSON.stringify(anoncount)
                    );
                  }
                }
                local.push(parseInt(j.id, 10));
                localStorage.setItem("watched", JSON.stringify(local));
              } else {
                j.classList.remove("seen");
                j.classList.add("unseen");

                if (loggedIn == 1) {
                  var index = dbWatched.indexOf(parseInt(j.id, 10));
                  dbWatched.splice(index, 1);
                  userDoc.set(
                    {
                      watched: dbWatched,
                    },
                    { merge: true }
                  );
                } else {
                  var index = local.indexOf(parseInt(j.id, 10));
                  if (index > -1) {
                    local.splice(index, 1);
                    localStorage.setItem("watched", JSON.stringify(local));
                  }
                }
              }
              updateBar();

              //leaders bars
              //create ratios and store
              if (loggedIn == 1) {
                var oscarsMatch = dbWatched.filter((element) =>
                  oscarsList.includes(element)
                );
                var oscarsRatio = Math.round(
                  (100 * oscarsMatch.length) / oscarsList.length
                );

                var globesMatch = dbWatched.filter((element) =>
                  globesList.includes(element)
                );
                var globesRatio = Math.round(
                  (100 * globesMatch.length) / globesList.length
                );

                var spiritMatch = dbWatched.filter((element) =>
                  spiritList.includes(element)
                );
                var spiritRatio = Math.round(
                  (100 * spiritMatch.length) / spiritList.length
                );

                userDoc.set(
                  {
                    oscars: oscarsRatio,
                    globes: globesRatio,
                    spirits: spiritRatio,
                  },
                  { merge: true }
                );
              }
            }
          );
        });
    }
  }
  //or clear the div if nothing is checked
  else {
    clearMovies();
    bar[0].style.width = "0%";
    bar[0].innerText = "0%";
  }
}
