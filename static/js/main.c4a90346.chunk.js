(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(e,t,a){},103:function(e,t,a){},118:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(8),l=a.n(o),i=a(3),s=a.n(i),c=a(55),u=a(13),d=a(2),m=a(4),g=a(10),f=a(9),v=a(11),h=a(22),p=a(45),b=a.n(p),E=a(46),C=a.n(E),S=function(){function e(){Object(d.a)(this,e)}return Object(m.a)(e,null,[{key:"downloadSong",value:function(e,t,a){var n=new b.a(e);t.title&&n.setFrame("TIT2",t.title),t.artist&&n.setFrame("TPE1",[t.artist]),t.album&&n.setFrame("TALB",t.album),t.year&&n.setFrame("TYER",t.year),t.albumCover&&n.setFrame("APIC",{type:0,data:t.albumCover.dataAsArrayBuffer,description:"",useUnicodeEncoding:!1}),n.addTag(),C.a.saveAs(n.getBlob(),a)}}]),e}(),y=a(6),w=a(47),N=a.n(w);a(88);function k(e){var t=e.file,a=e.song,n=e.albumCover,o=e.onToggleCutMode,l=e.onToggleEditMode,i=e.onClickDownload,s=e.isCuttingEnabled,c=e.isEditingEnabled,u=a.title&&a.artist?"".concat(a.artist," - ").concat(a.title):"";return r.a.createElement("div",{className:"row align-items-center mzt-song-wrapper"},r.a.createElement("div",{className:"col-auto"},r.a.createElement("img",{className:"img-thumbnail",alt:"album cover",src:n?n.dataAsTagSrc:N.a})),r.a.createElement("div",{className:"col mzt-col-song-header"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("h3",null,r.a.createElement("span",{className:"mzt-song-filename"},t.name)))),u&&r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("h4",null,r.a.createElement("span",{className:"mzt-song-heading"},u))))),r.a.createElement("div",{className:"col-1"},r.a.createElement("div",{className:"row",onClick:function(){return l()}},r.a.createElement(y.a,{content:"Toggle edit mode",arrow:!0,placement:"right",delay:400},r.a.createElement("i",{className:"fas fa-pencil-alt mzt-btn-actions ".concat(c?"active":"")}))),r.a.createElement("div",{className:"row",onClick:function(){return o()}},r.a.createElement(y.a,{content:"Toggle cut mode",arrow:!0,placement:"right",delay:400},r.a.createElement("i",{className:"fas fa-cut mzt-btn-actions ".concat(s?"active":"")}))),r.a.createElement("div",{className:"row",onClick:function(){return i()}},r.a.createElement(y.a,{content:"Download the song",arrow:!0,placement:"right",delay:400},r.a.createElement("i",{className:"fas fa-download mzt-btn-actions"})))))}var O=a(14),A=function(){function e(t,a){Object(d.a)(this,e),this.format=void 0,this.dataAsBase64=void 0,this.dataAsTagSrc=void 0,this.dataAsArrayBuffer=void 0,this.format=t,this.dataAsArrayBuffer=a instanceof ArrayBuffer?a:Uint8Array.from(a).buffer,this.dataAsBase64=this._arrayBufferAsBase64(this.dataAsArrayBuffer),this.dataAsTagSrc=this._getTagSrc(this.format,this.dataAsBase64)}return Object(m.a)(e,[{key:"_getTagSrc",value:function(e,t){return"data:".concat(e,";base64,").concat(btoa(t))}},{key:"_arrayBufferAsBase64",value:function(e){for(var t=new Uint8Array(e),a=t.byteLength,n="",r=0;r<a;r++)n+=String.fromCharCode(t[r]);return n}},{key:"setCover",value:function(e){this.dataAsArrayBuffer=e,this.dataAsBase64=this._arrayBufferAsBase64(this.dataAsArrayBuffer),this.dataAsTagSrc=this._getTagSrc(this.format,this.dataAsBase64)}},{key:"equals",value:function(e){return!(!e||this.dataAsTagSrc!==e.dataAsTagSrc)}},{key:"copyTo",value:function(e){return e.format=this.format,e.dataAsBase64=this.dataAsBase64,e.dataAsTagSrc=this.dataAsTagSrc,e.dataAsArrayBuffer=this.dataAsArrayBuffer,e}}]),e}(),T=(a(91),function(e){function t(e){var a;Object(d.a)(this,t),(a=Object(g.a)(this,Object(f.a)(t).call(this,e))).handleInputClicked=function(){var e=l.a.findDOMNode(Object(O.a)(a)).getElementsByClassName("btn-upload-cover")[0];e&&e.click()},a.handleSongEdit=function(e,t){var n=a.props.originalSong,r=a.state.editableSong;r[e]=t,a.setState({editableSong:r,wasSongEdited:!n.equals(r)})},a.handleUploadCover=function(e){if(e.target.files&&!(e.target.files.length<1)){var t=e.target.files[0],n=new FileReader;n.onerror=function(e){},n.onload=function(){var e=n.result,r=a.state.editableSong,o=a.props.originalSong;r.albumCover?r.albumCover.setCover(e):r.albumCover=new A(t.type,e),a.setState({editableSong:r,wasSongEdited:!o.equals(r)}),a.props.onUploadCover(r.albumCover)},n.readAsArrayBuffer(t)}},a.handleClickSaveChanges=function(){a.setState({wasSongEdited:!1}),a.props.onSaveChanges(a.state.editableSong)},a.handleClickCancel=function(){var e=a.state.editableSong,t=a.props.originalSong;a.setState({editableSong:t.copyTo(e),wasSongEdited:!1}),a.props.onCancelChanges()};var n=a.props.originalSong;return a.state={editableSong:n.clone(),wasSongEdited:!1},a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.state.editableSong,a=t.title,n=t.artist,o=t.album,l=t.year,i=this.state.wasSongEdited;return r.a.createElement("div",{className:"row mzt-row-details"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"mzt-input-title"},"Title"),r.a.createElement("input",{id:"mzt-input-title",type:"text",className:"form-control",value:a,onChange:function(t){return e.handleSongEdit("title",t.target.value)}})))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"mzt-input-artist"},"Artist"),r.a.createElement("input",{id:"mzt-input-artist",type:"text",className:"form-control",value:n,onChange:function(t){return e.handleSongEdit("artist",t.target.value)}}))))),r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"mzt-input-album"},"Album"),r.a.createElement("input",{id:"mzt-input-album",type:"text",className:"form-control",value:o,onChange:function(t){return e.handleSongEdit("album",t.target.value)}})))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"mzt-input-year"},"Year"),r.a.createElement("input",{id:"mzt-input-year",type:"number",className:"form-control",value:l,onChange:function(t){return e.handleSongEdit("year",t.target.value)}}))))))," ",r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-1"},r.a.createElement("div",i?{onClick:this.handleClickSaveChanges}:{},r.a.createElement(y.a,{content:"Save changes",arrow:!0,placement:"bottom",delay:400},r.a.createElement("i",{className:"fas fa-save mzt-btn-actions ".concat(i?"success":"disabled")})))),r.a.createElement("div",{className:"col-1"},r.a.createElement("input",{className:"btn-upload-cover mzt-invisible",type:"file",accept:".jpg,.jpeg",onChange:function(t){return e.handleUploadCover(t)}}),r.a.createElement("div",{onClick:this.handleInputClicked},r.a.createElement(y.a,{content:"Upload new album cover",arrow:!0,placement:"bottom",delay:400},r.a.createElement("i",{className:"fas fa-file-image mzt-btn-actions"})))),r.a.createElement("div",{className:"col-1"},r.a.createElement("div",{onClick:this.handleClickCancel},r.a.createElement(y.a,{content:"Cancel changes",arrow:!0,placement:"bottom",delay:400},r.a.createElement("i",{className:"fas fa-ban mzt-btn-actions ".concat(i?"":"disabled")})))))," "))}}]),t}(n.Component)),j=a(27),F=a(49),B=a.n(F),P={barWidth:2,barGap:2,hideScrollbar:!0,cursorWidth:0,waveColor:"#d0d0d0",progressColor:"#232526",skipLength:5},x=a(50),R=a.n(x),z={color:"white",hideOnBlur:!0,width:"2px",showTime:!0,opacity:"1",customShowTimeStyle:{"margin-left":"5px",padding:"1px 7px 3px 7px","border-radius":"0.2em","background-color":"white"},customStyle:{"margin-left":"13.5px"}},M=a(51),I=a.n(M),U=a(52),D=a.n(U),_=(a(102),function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(g.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).WAVEFORM_CONTAINER="waveform",a.REGION_COLOR="rgba(0, 123, 255, 0.48)",a.state={isPlaying:!1,originalCutStart:NaN,originalCutEnd:NaN,cutStart:NaN,cutEnd:NaN,addFadeIn:!1,addFadeOut:!1,wasRegionChanged:!1},a.componentWillUnmount=function(){var e=a.state.waveSurfer;e&&e.destroy()},a.onWaveSurferReady=function(e){var t,n;e.on("region-created",a.onCropRegionCreated),e.on("region-updated",a.onCropRegionUpdated),e.on("region-update-end",a.onCropRegionUpdateEnd);var r=e.getDuration();r>40?(t=20,n=r-20):(t=0,n=r),e.addRegion({start:t,end:n,color:a.REGION_COLOR}),a.setState({waveSurfer:e,cutStart:t,cutEnd:n,originalCutStart:t,originalCutEnd:n})},a.onCropRegionCreated=function(e){e.element.attributes.title.value=""},a.onCropRegionUpdated=function(e){var t=e.start,n=e.end,r=a.state,o=r.cutStart,l=r.cutEnd,i=r.waveSurfer,s=r.isPlaying;if(i&&(e.element.attributes.title.value="",!(Math.abs(t-n)>.25))){var c=a.recreateRegion(i,o,l);s&&c.play(),a.setState({waveSurfer:i})}},a.onCropRegionUpdateEnd=function(e){var t=e.start,n=e.end,r=a.state,o=r.isPlaying,l=r.waveSurfer,i=r.cutStart;l&&(o&&(t!==i?l.play(t):l.play(n)),a.setState({cutStart:t,cutEnd:n,wasRegionChanged:!0}))},a.recreateRegion=function(e,t,n){return e.clearRegions(),e.addRegion({start:t,end:n,color:a.REGION_COLOR})},a.onSongFinishedPlaying=function(){a.setState({isPlaying:!1})},a.handleClickTogglePlay=function(){var e=a.state,t=e.waveSurfer,n=e.isPlaying;t&&(n?t.pause():t.play(),a.setState({isPlaying:!n}))},a.handleClickJump=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=a.state,n=t.isPlaying,r=t.waveSurfer;if(r)if(e){var o=r.getDuration(),l=r.getCurrentTime();r.skip(o-l-5),r.pause(),r.skipForward(),a.setState({isPlaying:!1})}else r.stop(),n&&r.play()},a.handleClickCut=function(){var e=a.state,t=e.waveSurfer,n=e.isPlaying,r=e.cutStart,o=e.cutEnd,l=e.addFadeIn,i=e.addFadeOut;t&&(n&&(t.stop(),a.setState({isPlaying:!1})),a.props.onCut(r,o,l,i))},a.handleClickCancel=function(){var e=a.state,t=e.waveSurfer,n=e.originalCutStart,r=e.originalCutEnd;t&&(a.recreateRegion(t,n,r),t.stop(),a.setState({waveSurfer:t,isPlaying:!1,cutStart:n,cutEnd:r,wasRegionChanged:!1}))},a.toggleFadeIn=function(){a.setState(function(e){return{addFadeIn:!e.addFadeIn}})},a.toggleFadeOut=function(){a.setState(function(e){return{addFadeOut:!e.addFadeOut}})},a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.blobToPlay,a=l.a.findDOMNode(this).getElementsByClassName("waveform")[0],n=R.a.create(Object(j.a)({container:a},P,{plugins:[I.a.create(Object(j.a)({},z)),D.a.create()]}));n.on("ready",function(){return e.onWaveSurferReady(n)}),n.on("finish",function(){return e.onSongFinishedPlaying()}),n.loadBlob(t)}},{key:"render",value:function(){var e=this,t=this.state,a=t.waveSurfer,n=t.isPlaying,o=t.wasRegionChanged,l=t.addFadeIn,i=t.addFadeOut,s=!a,c="fas fa-".concat(n?"pause":"play"," mzt-btn-actions"),u=n?"Pause":"Play";return r.a.createElement(B.a,{className:"loading-spinner",active:s,text:"Generating audio wave..",spinner:!0,fadeSpeed:200},r.a.createElement("div",{className:"row mzt-row-waveform ".concat(s?"mzt-hidden":"")},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:this.WAVEFORM_CONTAINER}))),r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-1"},r.a.createElement(y.a,{content:"Toggle fade in",arrow:!0,placement:"bottom",delay:400},r.a.createElement("i",{className:"fas fa-signal mzt-btn-actions ".concat(l?"active":""),onClick:this.toggleFadeIn}))),r.a.createElement("div",{className:"col-1"},r.a.createElement(y.a,{content:"Toggle fade out",arrow:!0,placement:"bottom",delay:400},r.a.createElement("i",{className:"fas fa-signal mzt-btn-actions mirrored ".concat(i?"active":""),onClick:this.toggleFadeOut}))),r.a.createElement("div",{className:"col-1"},r.a.createElement(y.a,{content:"Cut the song to selected region",arrow:!0,placement:"bottom",delay:400},r.a.createElement("i",Object.assign({className:"fas fa-cut mzt-btn-actions ".concat(o?"success":"disabled")},o?{onClick:this.handleClickCut}:{})))),r.a.createElement("div",{className:"col-1"},r.a.createElement(y.a,{content:"Jump to start",arrow:!0,placement:"bottom",delay:400},r.a.createElement("i",{className:"fas fa-step-backward mzt-btn-actions",onClick:function(){return e.handleClickJump(!1)}}))),r.a.createElement("div",{className:"col-1"},r.a.createElement(y.a,{content:u,arrow:!0,placement:"bottom",delay:400},r.a.createElement("i",{className:c,onClick:function(){return e.handleClickTogglePlay()}}))),r.a.createElement("div",{className:"col-1"},r.a.createElement(y.a,{content:"Jump to end",arrow:!0,placement:"bottom",delay:400},r.a.createElement("i",{className:"fas fa-step-forward mzt-btn-actions",onClick:function(){return e.handleClickJump(!0)}}))),r.a.createElement("div",{className:"col-1"},r.a.createElement(y.a,{content:"Recreate regions",arrow:!0,placement:"bottom",delay:400},r.a.createElement("i",Object.assign({className:"fas fa-ban mzt-btn-actions ".concat(o?"":"disabled")},o?{onClick:this.handleClickCancel}:{})))))," ")))}}]),t}(n.Component)),J=(a(103),function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(g.a)(this,Object(f.a)(t).call(this,e))).handleToggleEditMode=function(){a.setState(function(e){return{isEditModeEnabled:!e.isEditModeEnabled}})},a.handleClickDownloadSong=Object(u.a)(s.a.mark(function e(){var t,n,r,o,l,i,c;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=a.state,n=t.blob,r=t.file,o=t.editableSong,l=t.originalSong,!n){e.next=7;break}return e.next=4,new Response(n).arrayBuffer();case 4:return i=e.sent,S.downloadSong(i,o,r.name),e.abrupt("return");case 7:(c=new FileReader).onload=function(){var e=c.result;S.downloadSong(e,o,r.name),a.setState({editableSong:o,originalSong:o.copyTo(l)})},c.onerror=function(e){console.log(e)},c.readAsArrayBuffer(a.state.file);case 11:case"end":return e.stop()}},e)})),a.handleToggleCutMode=function(){a.setState(function(e){return{isCutModeEnabled:!e.isCutModeEnabled}})},a.onSongSave=function(e){var t=a.state.editableSong;a.setState({editableSong:e.copyTo(t),wereChangesSaved:!0})},a.handleClickCancelChanges=function(){var e=a.state,t=e.originalSong,n=e.editableSong;a.setState({editableSong:t.copyTo(n),albumCover:t.albumCover})},a.handleCutSong=function(){var e=Object(u.a)(s.a.mark(function e(t,n,r,o){var l,i,c,u,d,m,g,f,v,p;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return l=a.state.file,a.setState({isBeingCut:!0}),i=1e3*t,c=1e3*n,u=3e3,d=new h.Decoder,e.next=8,d.decodeFile(l);case 8:return m=e.sent,(g=new h.BufferManipulations(m)).cut(i,c),r&&g.fadeIn(0,u),o&&g.fadeOut(u),e.next=15,g.apply();case 15:return f=e.sent,v=new h.Encoder,e.next=19,v.encodeToMP3Blob(f,192);case 19:p=e.sent,a.setState({blob:p,isBeingCut:!1});case 21:case"end":return e.stop()}},e)}));return function(t,a,n,r){return e.apply(this,arguments)}}(),a.onAlbumCoverUploaded=function(e){a.setState({albumCover:e})},a.state={isBeingCut:!1,blob:void 0,file:e.file,isCutModeEnabled:!1,isEditModeEnabled:!1,wereChangesSaved:!1,albumCover:e.song.albumCover,originalSong:e.song,editableSong:e.song.clone()},a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state,t=e.blob,a=e.file,n=e.albumCover,o=e.originalSong,l=e.editableSong,i=e.isCutModeEnabled,s=e.isEditModeEnabled,c=e.isBeingCut,u=e.wereChangesSaved;return r.a.createElement("div",{className:"row align-items-center mzt-song-container"},r.a.createElement("div",{className:"col-12"},r.a.createElement("div",{className:"row mzt-row-song"},r.a.createElement("div",{className:"col"},r.a.createElement(k,{file:a,song:o,albumCover:n,editableSong:l,onToggleCutMode:this.handleToggleCutMode,onToggleEditMode:this.handleToggleEditMode,onClickDownload:this.handleClickDownloadSong,isCuttingEnabled:i,isEditingEnabled:s,isDownloadEnabled:u}),i&&!c&&r.a.createElement(_,{blobToPlay:t||a,songToPlay:o,onCut:this.handleCutSong}),s&&r.a.createElement(T,{originalSong:l,onSaveChanges:this.onSongSave,onUploadCover:this.onAlbumCoverUploaded,onCancelChanges:this.handleClickCancelChanges})))))}}]),t}(n.Component)),V=a(53),W=a.n(V),L=function e(t,a){Object(d.a)(this,e),this.file=t,this.song=a},q=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",o=arguments.length>4?arguments[4]:void 0;Object(d.a)(this,e),this.artist=t,this.title=a,this.album=n,this.year=r,this.albumCover=o}return Object(m.a)(e,[{key:"equals",value:function(e){return!(!e||this.artist!==e.artist||this.title!==e.title||this.album!==e.album||this.year!==e.year)&&!(this.albumCover&&!this.albumCover.equals(e.albumCover))}},{key:"clone",value:function(){var t=this.albumCover,a=t?new A(t.format,t.dataAsArrayBuffer):void 0;return new e(this.artist,this.title,this.album,this.year,a)}},{key:"copyTo",value:function(e){if(e.artist=this.artist,e.title=this.title,e.album=this.album,e.year=this.year,this.albumCover)if(e.albumCover)this.albumCover.copyTo(e.albumCover);else{var t=this.albumCover;e.albumCover=new A(t.format,t.dataAsArrayBuffer)}else e.albumCover=void 0;return e}}]),e}(),G=function(){function e(){Object(d.a)(this,e)}return Object(m.a)(e,null,[{key:"convertFilesToSongs",value:function(e){var t=new Array;return e.forEach(function(e){t.push(new Promise(function(t,a){W.a.read(e,{onSuccess:function(a){var n=a.tags,r=n.artist,o=n.title,l=n.album,i=n.year,s=n.picture,c=s?new A(s.format,s.data):void 0,u=new q(r,o,l,i,c),d=new L(e,u);t(d)},onError:function(t){var n="Failed to load: ".concat(e.name," because ").concat(t);a(n)}})}))}),t}}]),e}(),Y=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(g.a)(this,Object(f.a)(t).call(this,e))).onFilesSelected=a.onFilesSelected.bind(Object(O.a)(a)),a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"onInputClicked",value:function(){var e=document.getElementById("btn-upload-songs");e&&e.click()}},{key:"onFilesSelected",value:function(){var e=Object(u.a)(s.a.mark(function e(t){var a,n,r;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.target.files&&!(t.target.files.length<1)){e.next=2;break}return e.abrupt("return");case 2:return a=Array.from(t.target.files),e.next=5,G.convertFilesToSongs(a);case 5:n=e.sent,this.props.onFilesSelected(n),(r=document.getElementById("btn-upload-songs"))&&(r.nodeValue="");case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",{className:"row justify-content-center mb-4"},r.a.createElement("div",{className:"col-2"},r.a.createElement("div",{className:"btn btn-primary",onClick:this.onInputClicked},"Upload songs"),r.a.createElement("input",{id:"btn-upload-songs",className:"mzt-invisible",type:"file",multiple:!0,accept:".mp3",onChange:this.onFilesSelected})))}}]),t}(n.Component),H=a(54);a(117);var K=function(e){var t=e.maxValue,a=e.curValue,n=e.heading,o=Math.round(a/t*100);return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-6 offset-3"},r.a.createElement("h4",null,n),r.a.createElement(H.Progress,{percent:o,status:"success"})))},Q=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(g.a)(this,Object(f.a)(t).call(this,e))).handleFilesSelected=function(){var e=Object(u.a)(s.a.mark(function e(t){var n,r,o,l,i,u,d;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a.state.uploadedFiles.length>0)){e.next=4;break}return e.next=4,a.removeSongsOneByOne();case 4:for(a.setState({uploadedFiles:[],songsProcessed:0,songsToProcess:t.length}),n=0,r=!0,o=!1,l=void 0,e.prev=9,i=function(){var e=d.value;setTimeout(function(){e.then(function(e){a.setState(function(t){return{uploadedFiles:[].concat(Object(c.a)(t.uploadedFiles),[e]),songsProcessed:t.songsProcessed+1}})},function(e){console.log(e),a.setState(function(e){return{songsProcessed:e.songsProcessed+1}})})},n),n+=100},u=t[Symbol.iterator]();!(r=(d=u.next()).done);r=!0)i();e.next=18;break;case 14:e.prev=14,e.t0=e.catch(9),o=!0,l=e.t0;case 18:e.prev=18,e.prev=19,r||null==u.return||u.return();case 21:if(e.prev=21,!o){e.next=24;break}throw l;case 24:return e.finish(21);case 25:return e.finish(18);case 26:case"end":return e.stop()}},e,null,[[9,14,18,26],[19,,21,25]])}));return function(t){return e.apply(this,arguments)}}(),a.removeSongsOneByOne=Object(u.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(e,t){for(var n=a.state.uploadedFiles,r=100,o=0,l=n.length;o<l;o++)setTimeout(function(){n.pop(),a.setState({uploadedFiles:n}),n.length<1&&e()},r),r+=100}));case 1:case"end":return e.stop()}},e)})),a.state={uploadedFiles:[],songsToProcess:0,songsProcessed:0},a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state,t=e.uploadedFiles,a=e.songsToProcess,n=e.songsProcessed,o=a!==n&&a>0;return r.a.createElement("div",{className:"container"},o?r.a.createElement(K,{maxValue:a,curValue:n,heading:"Songs processed: ".concat(n,"/").concat(a)}):r.a.createElement(Y,{onFilesSelected:this.handleFilesSelected}),t.map(function(e){return r.a.createElement(J,{key:e.file.name,file:e.file,song:e.song})}))}}]),t}(n.Component);l.a.render(r.a.createElement(Q,null),document.getElementById("root"))},47:function(e,t,a){e.exports=a.p+"static/media/cover_350x350.c4a0bf2b.png"},56:function(e,t,a){e.exports=a(118)},88:function(e,t,a){},91:function(e,t,a){}},[[56,1,2]]]);
//# sourceMappingURL=main.c4a90346.chunk.js.map