(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{39:function(e,t,n){e.exports=n(93)},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},67:function(e,t,n){},68:function(e,t,n){},69:function(e,t,n){},93:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),i=n(29),r=n.n(i),s=(n(44),n(45),n(34)),c=n(6),o=(n(46),function(){window.open("https://accounts.spotify.com/en/logout","_blank")}),u=function(){window.location=window.location.origin};var d=function(){return l.a.createElement("ul",{className:"nav nav-tabs"},l.a.createElement("li",{className:"nav-item"},l.a.createElement("button",{className:"signout",onClick:function(e){o(),u()}},"Spotify Sign Out")))},m=n(12),g=n(30),h=n(31),f=n(37),S=n(32),v=n(38);n(47);var b=function(e){return l.a.createElement("div",{className:"container"},e.children)};var y=function(e){return l.a.createElement("div",{className:"row"},e.children)};var E=function(e){var t=e.size.split(" ").map(function(e){return"col-"+e}).join(" ");return l.a.createElement("div",{className:t},e.children)};var p=function(e){return l.a.createElement("div",{className:"card text-center"},l.a.createElement("div",{className:"card-header"},l.a.createElement("h2",null,e.heading)),l.a.createElement("div",{className:"card-body"},e.children))};var k=function(e){return l.a.createElement("form",null,l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"search"},l.a.createElement("h3",{style:{backgroundColor:"coral"}},e.description)),l.a.createElement("input",{onChange:e.handleInputChange,value:e.value,name:e.name,type:"text",className:"form-control",placeholder:e.placeholder}),l.a.createElement("br",null),l.a.createElement("button",{onClick:e.handleFormSubmit,className:"btn btn-primary"},e.buttonText)))},w=n(33),D=n.n(w);var P=function(e){var t={display:"none"},n={margin:"40px",border:"5px solid pink"},a={width:"100%",height:80};return l.a.createElement("div",{className:"text-center"},console.log("Songs Currently in Personal Playlist",e.trackInReceivingDatabase),console.log("Songs Currently in Banished Database",e.trackInDatabase),e.results.items.map(function(i){return l.a.createElement("div",{key:i.track.uri,style:e.trackInDatabase.some(function(e){return e.trackId===i.track.uri})||e.trackInReceivingDatabase.some(function(e){return e.track.uri===i.track.uri})?t:n},l.a.createElement(D.a,{uri:i.track.uri,size:a,view:"list",theme:"black"}),l.a.createElement("span",{onClick:function(){e.onClickActionBan(i.track)},className:"btn btn-danger",role:"button",tabIndex:"0"},"Banish"),l.a.createElement("span",{onClick:function(){e.onClickActionSave(i.track)},className:"btn btn-success",role:"button",tabIndex:"0"},"Save"),l.a.createElement("hr",null))}))},C=n(9),N=n.n(C),I={getSongs:function(e){return N.a.get("/api/tracks/?q="+e)},banSong:function(e){return N.a.post("/api/tracks",e)},deleteSong:function(e){return N.a.delete("/api/tracks/"+e)},deleteAllSongs:function(e){return N.a.delete("/api/tracks/?q="+e)}};n(67);function A(e){var t=e.children;return l.a.createElement("div",{className:"list-overflow-container"},l.a.createElement("ul",{className:"list-group"},t))}function x(e){var t=e.children;return l.a.createElement("li",{className:"list-group-item"},t)}n(68);var T=function(e){return l.a.createElement("span",Object.assign({className:"delete-btn"},e,{role:"button",tabIndex:"0"}),"UnBanish")};n(69);var j=function(e){return l.a.createElement("span",Object.assign({className:"select-btn"},e,{role:"button",tabIndex:"0"}),"Select")},B=n(10),O=n.n(B),M=function(e){function t(){var e,a;Object(g.a)(this,t);for(var l=arguments.length,i=new Array(l),r=0;r<l;r++)i[r]=arguments[r];return(a=Object(f.a)(this,(e=Object(S.a)(t)).call.apply(e,[this].concat(i)))).state={result:"",search:"",selectedSendingPlaylistSearch:"",selectedSendingPlaylistData:[],selectedSendingPlaylistDetails:"",userData:"",banishedSongs:[],serverData:"",receivingPlaylist:"",userPlaylists:[]},a.getPlaylistDetailsSetState=function(e,t){var l=new(n(11)),i=O.a.parse(window.location.search).access_token;l.setAccessToken(i);var r=t;l.getPlaylist(e).then(function(e){console.log("Selected Playlist Details",e.body),a.setState(Object(m.a)({},"".concat(r),e.body))},function(e){console.log("Something went wrong!",e)})},a.getAllTracksSetState=function(e,t){var l=t,i=0,r=[],s={items:[]};!function e(t,c){var o=new(n(11)),u=O.a.parse(window.location.search).access_token;o.setAccessToken(u),o.getPlaylistTracks(c,{limit:100,offset:t}).then(function(t){null!=t.body.next?(console.log("On we Go!"),t.body.items.forEach(function(e,t){r.push(e)}),e(i+=100,c)):(t.body.items.forEach(function(e,t){r.push(e),s.items=r}),console.log("Selected Playlist Contains These Tracks",s),a.setState(Object(m.a)({},"".concat(l),s)))},function(e){console.log("Something went wrong!",e)})}(0,e)},a.viewMongoDbData=function(e){I.getSongs(e).then(function(e){return a.setState({banishedSongs:e.data})}).catch(function(e){return console.log(e)})},a.unBanishAllSongs=function(){I.deleteAllSongs(a.state.userData.id).then(function(e){return a.viewMongoDbData(a.state.userData.id)}).catch(function(e){return console.log(e)})},a.deleteSong=function(e){I.deleteSong(e).then(function(e){return a.viewMongoDbData(a.state.userData.id)}).catch(function(e){return console.log(e)})},a.handleSaveSong=function(e){var t=new(n(11)),l=O.a.parse(window.location.search).access_token;t.setAccessToken(l),t.addTracksToPlaylist(a.state.selectedSendingPlaylistDetails.id,["spotify:track:".concat(e.id)]).then(function(e){return a.getAllTracksSetState(a.state.selectedSendingPlaylistSearch,"selectedSendingPlaylistData")}).catch(function(e){return console.log(e)})},a.handleBanSong=function(e){I.banSong({title:e.name,artists:e.artists.map(function(e){return e.name}).join(", "),userName:a.state.userData.display_name,userId:a.state.userData.id,trackId:e.uri}).then(function(e){return a.viewMongoDbData(a.state.userData.id)}).catch(function(e){return console.log(e)})},a.handleInputChange=function(e){var t=e.target.value,n=e.target.name;a.setState(Object(m.a)({},n,t))},a.handleReceivingPlaylistSubmit=function(e){e.preventDefault(),console.log(a.state.search),a.getAllTracksSetState(a.state.search,"serverData"),a.getPlaylistDetailsSetState(a.state.search,"receivingPlaylist")},a.handleReceivingPlaylistSubmitLink=function(e){a.setState({search:e}),a.getAllTracksSetState(e,"serverData"),a.getPlaylistDetailsSetState(e,"receivingPlaylist")},a.handleSendingPlaylistSubmit=function(e){e.preventDefault(),console.log(a.state.selectedSendingPlaylistSearch),a.getAllTracksSetState(a.state.selectedSendingPlaylistSearch,"selectedSendingPlaylistData"),a.getPlaylistDetailsSetState(a.state.selectedSendingPlaylistSearch,"selectedSendingPlaylistDetails")},a.handleSendingPlaylistSubmitLink=function(e){a.setState({selectedSendingPlaylistSearch:e}),a.getAllTracksSetState(e,"selectedSendingPlaylistData"),a.getPlaylistDetailsSetState(e,"selectedSendingPlaylistDetails")},a}return Object(v.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=new(n(11)),a=O.a.parse(window.location.search).access_token;this.viewMongoDbData(),t.setAccessToken(a),t.getMe().then(function(t){return e.viewMongoDbData(t.body.id)},function(e){console.log("Something went wrong!",e)}),t.getMe().then(function(t){return e.setState({userData:t.body})},function(e){console.log("Something went wrong!",e)}),t.getUserPlaylists(this.state.userData.id).then(function(t){return e.setState({userPlaylists:t.body.items})},function(e){console.log("Something went wrong!",e)})}},{key:"render",value:function(){var e=this;return l.a.createElement(b,null,l.a.createElement(y,null,l.a.createElement(E,{size:"md-8"},l.a.createElement(p,{heading:this.state.receivingPlaylist.name},this.state.serverData?l.a.createElement(P,{results:this.state.serverData,onClickActionBan:this.handleBanSong,onClickActionSave:this.handleSaveSong,trackInDatabase:this.state.banishedSongs,trackInReceivingDatabase:this.state.selectedSendingPlaylistData.items,userIdCurrentlyLoggedIn:this.state.userData.id}):l.a.createElement("div",null,l.a.createElement("h3",null,"Welcome to MixTape: ",l.a.createElement("span",{style:{backgroundColor:"coral"}},this.state.userData.display_name))),this.state.userData?l.a.createElement("div",null):l.a.createElement("div",null,l.a.createElement("p",null,"Click Login Button to Begin!"),l.a.createElement("span",{onClick:function(){return window.location="http://localhost:8888/login"},className:"btn btn-primary",role:"button",tabIndex:"0"},"Login to Spotify")))),l.a.createElement(E,{size:"md-4"},l.a.createElement(p,{heading:"Playlists"},this.state.selectedSendingPlaylistDetails?l.a.createElement("div",null,l.a.createElement("h3",null,"Select Public Playlist")):l.a.createElement("div",null),this.state.selectedSendingPlaylistDetails?l.a.createElement("div",null,l.a.createElement(k,{placeholder:"Public Playlist URI",buttonText:"Submit",value:this.state.search,handleInputChange:this.handleInputChange,name:"search",handleFormSubmit:this.handleReceivingPlaylistSubmit}),l.a.createElement("h3",{style:{backgroundColor:"coral"}},this.state.receivingPlaylist.name),l.a.createElement("h5",null,"Your saved public playlists"),l.a.createElement(A,null,this.state.userPlaylists.map(function(t){return l.a.createElement("div",{key:t.id,style:{display:t.owner.id===e.state.userData.id?"none":""}},l.a.createElement(x,null,l.a.createElement("strong",null,t.name),l.a.createElement(j,{onClick:function(){return e.handleReceivingPlaylistSubmitLink(t.id)}})))}))):l.a.createElement("div",null,l.a.createElement("h3",null,"Select Your Playlist")),l.a.createElement("br",null),l.a.createElement("h3",{style:{backgroundColor:"coral"}},this.state.selectedSendingPlaylistDetails.name),l.a.createElement("h5",null,"Your personal playlists"),l.a.createElement(A,null,this.state.userPlaylists.map(function(t){return l.a.createElement("div",{key:t.id,style:{display:t.owner.id===e.state.userData.id?"":"none"}},l.a.createElement(x,null,l.a.createElement("strong",null,t.name),l.a.createElement(j,{onClick:function(){return e.handleSendingPlaylistSubmitLink(t.id)}})))}))),l.a.createElement(p,{heading:"Banished Songs"},this.state.userData?l.a.createElement("span",{onClick:function(){return e.unBanishAllSongs()},className:"btn btn-success",role:"button",tabIndex:"0"},"Unbanish All Songs"):l.a.createElement("div",null),l.a.createElement(A,null,this.state.banishedSongs.map(function(t){return l.a.createElement(x,{key:t._id},l.a.createElement("strong",null,l.a.createElement("u",null,t.title),l.a.createElement("br",null),"by ",t.artists),l.a.createElement(T,{onClick:function(){return e.deleteSong(t._id)}}))}))))))}}]),t}(a.Component);var L=function(){return l.a.createElement(M,null)};var R=function(){return l.a.createElement(s.a,null,l.a.createElement("div",null,l.a.createElement(d,null),l.a.createElement(c.a,{exact:!0,path:"/",component:L})))},_=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function U(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}r.a.render(l.a.createElement(R,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("","/service-worker.js");_?function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):U(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e):U(e)})}}()}},[[39,1,2]]]);
//# sourceMappingURL=main.de9b5d0b.chunk.js.map