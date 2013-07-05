/**
 * menuMatic 
 * @version 0.68.3 (beta)
 * @author Jason J. Jaeger | greengeckodesign.com
 * @copyright 2008 Jason John Jaeger
 * @license MIT-style License
 *      Permission is hereby granted, free of charge, to any person obtaining a copy
 *      of this software and associated documentation files (the "Software"), to deal
 *      in the Software without restriction, including without limitation the rights
 *      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *      copies of the Software, and to permit persons to whom the Software is
 *      furnished to do so, subject to the following conditions:
 *  
 *      The above copyright notice and this permission notice shall be included in
 *      all copies or substantial portions of the Software.
 *  
 *      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *      THE SOFTWARE.
 **/  
var MenuMatic=new Class({Implements:Options,options:{id:"nav",subMenusContainerId:"subMenusContainer",effect:"fade",duration:600,physics:Fx.Transitions.Pow.easeOut,hideDelay:1000,stretchMainMenu:false,matchWidthMode:false,orientation:"horizontal",direction:{x:"right",y:"down"},tweakInitial:{x:0,y:0},tweakSubsequent:{x:0,y:0},center:false,opacity:95,mmbFocusedClassName:null,mmbClassName:null,killDivider:null,fixHasLayoutBug:false,onHideAllSubMenusNow_begin:(function(){}),onHideAllSubMenusNow_complete:(function(){}),onInit_begin:(function(){}),onInit_complete:(function(){})},hideAllMenusTimeout:null,allSubMenus:[],subMenuZindex:1,initialize:function(B){this.setOptions(B);this.options.onInit_begin();if(this.options.opacity>99){this.options.opacity=99.9}this.options.opacity=this.options.opacity/100;Element.implement({getId:function(){if(!this.id){var E=this.get("tag")+"-"+$time();while($(E)){E=this.get("tag")+"-"+$time()}this.id=E}return this.id}});this.options.direction.x=this.options.direction.x.toLowerCase();this.options.direction.y=this.options.direction.y.toLowerCase();if(this.options.direction.x==="right"){this.options.direction.xInverse="left"}else{if(this.options.direction.x==="left"){this.options.direction.xInverse="right"}}if(this.options.direction.y==="up"){this.options.direction.yInverse="down"}else{if(this.options.direction.y==="down"){this.options.direction.yInverse="up"}}var A=$(this.options.id).getElements("a");A.each(function(F,E){F.store("parentLinks",F.getParent().getParents("li").getFirst("a"));F.store("parentLinks",F.retrieve("parentLinks").erase(F.retrieve("parentLinks").getFirst()));F.store("childMenu",F.getNext("ul")||F.getNext("ol"));theSubMenuType="subsequent";if($(F.getParent("ul")||F.getParent("ol")).id===this.options.id){theSubMenuType="initial"}F.store("subMenuType",theSubMenuType);if(theSubMenuType==="initial"&&$(F.getNext("ul")||F.getNext("ol"))){F.addClass("mainMenuParentBtn")}else{if($(F.getNext("ul")||F.getNext("ol"))){F.addClass("subMenuParentBtn")}}}.bind(this));var D=new Element("div",{id:this.options.subMenusContainerId}).inject($(document.body),"bottom");$(this.options.id).getElements("ul, ol").each(function(F,E){new Element("div",{"class":"smOW"}).inject(D).grab(F)}.bind(this));D.getElements("a").set("tabindex","-1");A.each(function(G,E){if(!G.retrieve("childMenu")){return }G.store("childMenu",G.retrieve("childMenu").getParent("div"));this.allSubMenus.include(G.retrieve("childMenu"));G.store("parentSubMenus",G.retrieve("parentLinks").retrieve("childMenu"));var F=new MenuMaticSubMenu(this.options,this,G)}.bind(this));var C=$(this.options.id).getElements("a").filter(function(F,E){return !F.retrieve("childMenu")});C.each(function(F,E){F.addEvents({mouseenter:function(G){this.hideAllSubMenusNow();if(this.options.mmbClassName&&this.options.mmbFocusedClassName){$(F).retrieve("btnMorph",new Fx.Morph(F,{duration:(this.options.duration/2),transition:this.options.physics,link:"cancel"})).start(this.options.mmbFocusedClassName)}}.bind(this),focus:function(G){this.hideAllSubMenusNow();if(this.options.mmbClassName&&this.options.mmbFocusedClassName){$(F).retrieve("btnMorph",new Fx.Morph(F,{duration:(this.options.duration/2),transition:this.options.physics,link:"cancel"})).start(this.options.mmbFocusedClassName)}}.bind(this),mouseleave:function(G){if(this.options.mmbClassName&&this.options.mmbFocusedClassName){$(F).retrieve("btnMorph",new Fx.Morph(F,{duration:(this.options.duration*5),transition:this.options.physics,link:"cancel"})).start(this.options.mmbClassName)}}.bind(this),blur:function(G){if(this.options.mmbClassName&&this.options.mmbFocusedClassName){$(F).retrieve("btnMorph",new Fx.Morph(F,{duration:(this.options.duration*5),transition:this.options.physics,link:"cancel"})).start(this.options.mmbClassName)}}.bind(this),keydown:function(H){var G=new Event(H);if(H.key==="up"||H.key==="down"||H.key==="left"||H.key==="right"){H.stop()}if(H.key==="left"&&this.options.orientation==="horizontal"||H.key==="up"&&this.options.orientation==="vertical"){if(F.getParent("li").getPrevious("li")){F.getParent("li").getPrevious("li").getFirst("a").focus()}else{F.getParent("li").getParent().getLast("li").getFirst("a").focus()}}else{if(H.key==="right"&&this.options.orientation==="horizontal"||H.key==="down"&&this.options.orientation==="vertical"){if(F.getParent("li").getNext("li")){F.getParent("li").getNext("li").getFirst("a").focus()}else{F.getParent("li").getParent().getFirst("li").getFirst("a").focus()}}}}.bind(this)})},this);this.stretch();this.killDivider();this.center();this.fixHasLayoutBug();this.options.onInit_complete()},fixHasLayoutBug:function(){if(Browser.Engine.trident&&this.options.fixHasLayoutBug){$(this.options.id).getParents().setStyle("zoom",1);$(this.options.id).setStyle("zoom",1);$(this.options.id).getChildren().setStyle("zoom",1);$(this.options.subMenusContainerId).setStyle("zoom",1);$(this.options.subMenusContainerId).getChildren().setStyle("zoom",1)}},center:function(){if(!this.options.center){return }$(this.options.id).setStyles({left:"50%","margin-left":-($(this.options.id).getSize().x/2)})},stretch:function(){if(this.options.stretchMainMenu&&this.options.orientation==="horizontal"){var C=parseFloat($(this.options.id).getCoordinates().width);var D=0;var B=$(this.options.id).getElements("a");B.setStyles({"padding-left":0,"padding-right":0});B.each(function(F,E){D+=F.getSize().x}.bind(this));if(C<D){return }var A=(C-D)/B.length;B.each(function(F,E){F.setStyle("width",F.getSize().x+A)}.bind(this));B.getLast().setStyle("width",B.getLast().getSize().x-1)}},killDivider:function(){if(this.options.killDivider&&this.options.killDivider.toLowerCase()==="first"){$($(this.options.id).getElements("li")[0]).setStyles({background:"none"})}else{if(this.options.killDivider&&this.options.killDivider.toLowerCase()==="last"){$($(this.options.id).getElements("li").getLast()).setStyles({background:"none"})}}},hideAllSubMenusNow:function(){this.options.onHideAllSubMenusNow_begin();$clear(this.hideAllMenusTimeout);$$(this.allSubMenus).fireEvent("hide");this.options.onHideAllSubMenusNow_complete()}});var MenuMaticSubMenu=new Class({Implements:Options,Extends:MenuMatic,options:{onSubMenuInit_begin:(function(A){}),onSubMenuInit_complete:(function(A){}),onMatchWidth_begin:(function(A){}),onMatchWidth_complete:(function(A){}),onHideSubMenu_begin:(function(A){}),onHideSubMenu_complete:(function(A){}),onHideOtherSubMenus_begin:(function(A){}),onHideOtherSubMenus_complete:(function(A){}),onHideAllSubMenus_begin:(function(A){}),onHideAllSubMenus_complete:(function(A){}),onPositionSubMenu_begin:(function(A){}),onPositionSubMenu_complete:(function(A){}),onShowSubMenu_begin:(function(A){}),onShowSubMenu_complete:(function(A){})},root:null,btn:null,hidden:true,myEffect:null,initialize:function(B,A,C){this.setOptions(B);this.root=A;this.btn=C;this.childMenu=this.btn.retrieve("childMenu");this.subMenuType=this.btn.retrieve("subMenuType");this.childMenu=this.btn.retrieve("childMenu");this.parentSubMenus=$$(this.btn.retrieve("parentSubMenus"));this.parentLinks=$$(this.btn.retrieve("parentLinks"));this.parentSubMenu=$(this.parentSubMenus[0]);if(this.parentSubMenu){this.parentSubMenu=this.parentSubMenu.retrieve("class")}this.childMenu.store("class",this);this.btn.store("class",this);this.childMenu.store("status","closed");this.options.onSubMenuInit_begin(this);this.childMenu.addEvent("hide",function(){this.hideSubMenu()}.bind(this));this.childMenu.addEvent("show",function(){this.showSubMenu()}.bind(this));if(this.options.effect){this.myEffect=new Fx.Morph($(this.childMenu).getFirst(),{duration:this.options.duration,transition:this.options.physics,link:"cancel"})}if(this.options.effect==="slide"||this.options.effect==="slide & fade"){if(this.subMenuType=="initial"&&this.options.orientation==="horizontal"){this.childMenu.getFirst().setStyle("margin-top","0")}else{this.childMenu.getFirst().setStyle("margin-left","0")}}else{if(this.options.effect==="fade"||this.options.effect==="slide & fade"){this.childMenu.getFirst().setStyle("opacity",0)}}if(this.options.effect!="fade"&&this.options.effect!="slide & fade"){this.childMenu.getFirst().setStyle("opacity",this.options.opacity)}var D=$(this.childMenu).getElements("a").filter(function(F,E){return !F.retrieve("childMenu")});D.each(function(F,E){$(F).addClass("subMenuBtn");F.addEvents({mouseenter:function(G){this.childMenu.fireEvent("show");this.cancellHideAllSubMenus();this.hideOtherSubMenus()}.bind(this),focus:function(G){this.childMenu.fireEvent("show");this.cancellHideAllSubMenus();this.hideOtherSubMenus()}.bind(this),mouseleave:function(G){this.cancellHideAllSubMenus();this.hideAllSubMenus()}.bind(this),blur:function(G){this.cancellHideAllSubMenus();this.hideAllSubMenus()}.bind(this),keydown:function(H){var G=new Event(H);if(H.key==="up"||H.key==="down"||H.key==="left"||H.key==="right"||H.key==="tab"){H.stop()}if(H.key==="up"){if(F.getParent("li").getPrevious("li")){F.getParent("li").getPrevious("li").getFirst("a").focus()}else{if(this.options.direction.y==="down"){this.btn.focus()}else{if(this.options.direction.y==="up"){F.getParent("li").getParent().getLast("li").getFirst("a").focus()}}}}else{if(H.key==="down"){if(F.getParent("li").getNext("li")){F.getParent("li").getNext("li").getFirst("a").focus()}else{if(this.options.direction.y==="down"){F.getParent("li").getParent().getFirst("li").getFirst("a").focus()}else{if(this.options.direction.y==="up"){this.btn.focus()}}}}else{if(H.key===this.options.direction.xInverse){this.btn.focus()}}}}.bind(this)})},this);$(this.btn).removeClass("subMenuBtn");if(this.subMenuType=="initial"){this.btn.addClass("mainParentBtn")}else{this.btn.addClass("subParentBtn")}$(this.btn).addEvents({mouseenter:function(E){this.cancellHideAllSubMenus();this.hideOtherSubMenus();this.showSubMenu();if(this.subMenuType==="initial"&&this.options.mmbClassName&&this.options.mmbFocusedClassName){$(this.btn).retrieve("btnMorph",new Fx.Morph($(this.btn),{duration:(this.options.duration/2),transition:this.options.physics,link:"cancel"})).start(this.options.mmbFocusedClassName)}}.bind(this),focus:function(E){this.cancellHideAllSubMenus();this.hideOtherSubMenus();this.showSubMenu();if(this.subMenuType==="initial"&&this.options.mmbClassName&&this.options.mmbFocusedClassName){$(this.btn).retrieve("btnMorph",new Fx.Morph($(this.btn),{duration:(this.options.duration/2),transition:this.options.physics,link:"cancel"})).start(this.options.mmbFocusedClassName)}}.bind(this),mouseleave:function(E){this.cancellHideAllSubMenus();this.hideAllSubMenus()}.bind(this),blur:function(E){this.cancellHideAllSubMenus();this.hideAllSubMenus()}.bind(this),keydown:function(E){E=new Event(E);if(E.key==="up"||E.key==="down"||E.key==="left"||E.key==="right"){E.stop()}if(!this.parentSubMenu){if(this.options.orientation==="horizontal"&&E.key===this.options.direction.y||this.options.orientation==="vertical"&&E.key===this.options.direction.x){if(this.options.direction.y==="down"){this.childMenu.getFirst().getFirst("li").getFirst("a").focus()}else{if(this.options.direction.y==="up"){this.childMenu.getFirst().getLast("li").getFirst("a").focus()}}}else{if(this.options.orientation==="horizontal"&&E.key==="left"||this.options.orientation==="vertical"&&E.key===this.options.direction.yInverse){if(this.btn.getParent().getPrevious()){this.btn.getParent().getPrevious().getFirst().focus()}else{this.btn.getParent().getParent().getLast().getFirst().focus()}}else{if(this.options.orientation==="horizontal"&&E.key==="right"||this.options.orientation==="vertical"&&E.key===this.options.direction.y){if(this.btn.getParent().getNext()){this.btn.getParent().getNext().getFirst().focus()}else{this.btn.getParent().getParent().getFirst().getFirst().focus()}}}}}else{if(E.key==="tab"){E.stop()}if(E.key==="up"){if(this.btn.getParent("li").getPrevious("li")){this.btn.getParent("li").getPrevious("li").getFirst("a").focus()}else{if(this.options.direction.y==="down"){this.parentSubMenu.btn.focus()}else{if(this.options.direction.y==="up"){this.btn.getParent("li").getParent().getLast("li").getFirst("a").focus()}}}}else{if(E.key==="down"){if(this.btn.getParent("li").getNext("li")){this.btn.getParent("li").getNext("li").getFirst("a").focus()}else{if(this.options.direction.y==="down"){this.btn.getParent("li").getParent().getFirst("li").getFirst("a").focus()}else{if(this.options.direction.y==="up"){this.parentSubMenu.btn.focus()}}}}else{if(E.key===this.options.direction.xInverse){this.parentSubMenu.btn.focus()}else{if(E.key===this.options.direction.x){if(this.options.direction.y==="down"){this.childMenu.getFirst().getFirst("li").getFirst("a").focus()}else{if(this.options.direction.y==="up"){}}}}}}}}.bind(this)});this.options.onSubMenuInit_complete(this)},matchWidth:function(){if(this.widthMatched||!this.options.matchWidthMode||this.subMenuType==="subsequent"){return }this.options.onMatchWidth_begin(this);var A=this.btn.getCoordinates().width;$(this.childMenu).getElements("a").each(function(E,D){var C=parseFloat($(this.childMenu).getFirst().getStyle("border-left-width"))+parseFloat($(this.childMenu).getFirst().getStyle("border-right-width"));var B=parseFloat(E.getStyle("padding-left"))+parseFloat(E.getStyle("padding-right"));var F=C+B;if(A>E.getCoordinates().width){E.setStyle("width",A-F);E.setStyle("margin-right",-C)}}.bind(this));this.width=this.childMenu.getFirst().getCoordinates().width;this.widthMatched=true;this.options.onMatchWidth_complete(this)},hideSubMenu:function(){if(this.childMenu.retrieve("status")==="closed"){return }this.options.onHideSubMenu_begin(this);if(this.subMenuType=="initial"){if(this.options.mmbClassName&&this.options.mmbFocusedClassName){$(this.btn).retrieve("btnMorph",new Fx.Morph($(this.btn),{duration:(this.options.duration),transition:this.options.physics,link:"cancel"})).start(this.options.mmbClassName).chain(function(){$(this.btn).removeClass("mainMenuParentBtnFocused");$(this.btn).addClass("mainMenuParentBtn")}.bind(this))}else{$(this.btn).removeClass("mainMenuParentBtnFocused");$(this.btn).addClass("mainMenuParentBtn")}}else{$(this.btn).removeClass("subMenuParentBtnFocused");$(this.btn).addClass("subMenuParentBtn")}this.childMenu.setStyle("z-index",1);if(this.options.effect&&this.options.effect.toLowerCase()==="slide"){if(this.subMenuType=="initial"&&this.options.orientation==="horizontal"&&this.options.direction.y==="down"){this.myEffect.start({"margin-top":-this.height}).chain(function(){this.childMenu.style.display="none"}.bind(this))}else{if(this.subMenuType=="initial"&&this.options.orientation==="horizontal"&&this.options.direction.y==="up"){this.myEffect.start({"margin-top":this.height}).chain(function(){this.childMenu.style.display="none"}.bind(this))}else{if(this.options.direction.x==="right"){this.myEffect.start({"margin-left":-this.width}).chain(function(){this.childMenu.style.display="none"}.bind(this))}else{if(this.options.direction.x==="left"){this.myEffect.start({"margin-left":this.width}).chain(function(){this.childMenu.style.display="none"}.bind(this))}}}}}else{if(this.options.effect=="fade"){this.myEffect.start({opacity:0}).chain(function(){this.childMenu.style.display="none"}.bind(this))}else{if(this.options.effect=="slide & fade"){if(this.subMenuType=="initial"&&this.options.orientation==="horizontal"&&this.options.direction.y==="down"){this.myEffect.start({"margin-top":-this.height,opacity:0}).chain(function(){this.childMenu.style.display="none"}.bind(this))}else{if(this.subMenuType=="initial"&&this.options.orientation==="horizontal"&&this.options.direction.y==="up"){this.myEffect.start({"margin-top":this.height,opacity:0}).chain(function(){this.childMenu.style.display="none"}.bind(this))}else{if(this.options.direction.x==="right"){this.myEffect.start({"margin-left":-this.width,opacity:0}).chain(function(){this.childMenu.style.display="none"}.bind(this))}else{if(this.options.direction.x==="left"){this.myEffect.start({"margin-left":this.width,opacity:0}).chain(function(){this.childMenu.style.display="none"}.bind(this))}}}}}else{this.childMenu.style.display="none"}}}this.childMenu.store("status","closed");this.options.onHideSubMenu_complete(this)},hideOtherSubMenus:function(){this.options.onHideOtherSubMenus_begin(this);if(!this.btn.retrieve("otherSubMenus")){this.btn.store("otherSubMenus",$$(this.root.allSubMenus.filter(function(A){return !this.btn.retrieve("parentSubMenus").contains(A)&&A!=this.childMenu}.bind(this))))}this.parentSubMenus.fireEvent("show");this.btn.retrieve("otherSubMenus").fireEvent("hide");this.options.onHideOtherSubMenus_complete(this)},hideAllSubMenus:function(){this.options.onHideAllSubMenus_begin(this);$clear(this.root.hideAllMenusTimeout);this.root.hideAllMenusTimeout=(function(){$clear(this.hideAllMenusTimeout);$$(this.root.allSubMenus).fireEvent("hide")}).bind(this).delay(this.options.hideDelay);this.options.onHideAllSubMenus_complete(this)},cancellHideAllSubMenus:function(){$clear(this.root.hideAllMenusTimeout)},showSubMenu:function(A){if(this.childMenu.retrieve("status")==="open"){return }this.options.onShowSubMenu_begin(this);if(this.subMenuType=="initial"){$(this.btn).removeClass("mainMenuParentBtn");$(this.btn).addClass("mainMenuParentBtnFocused")}else{$(this.btn).removeClass("subMenuParentBtn");$(this.btn).addClass("subMenuParentBtnFocused")}this.root.subMenuZindex++;this.childMenu.setStyles({display:"block",visibility:"hidden","z-index":this.root.subMenuZindex});if(!this.width||!this.height){this.width=this.childMenu.getFirst().getCoordinates().width;this.height=this.childMenu.getFirst().getCoordinates().height;this.childMenu.setStyle("height",this.height,"border");if(this.options.effect==="slide"||this.options.effect==="slide & fade"){if(this.subMenuType=="initial"&&this.options.orientation==="horizontal"){this.childMenu.getFirst().setStyle("margin-top","0");if(this.options.direction.y==="down"){this.myEffect.set({"margin-top":-this.height})}else{if(this.options.direction.y==="up"){this.myEffect.set({"margin-top":this.height})}}}else{if(this.options.direction.x==="left"){this.myEffect.set({"margin-left":this.width})}else{this.myEffect.set({"margin-left":-this.width})}}}}this.matchWidth();this.positionSubMenu();if(this.options.effect==="slide"){this.childMenu.setStyles({display:"block",visibility:"visible"});if(this.subMenuType==="initial"&&this.options.orientation==="horizontal"){if(A){this.myEffect.set({"margin-top":0}).chain(function(){this.showSubMenuComplete()}.bind(this))}else{this.myEffect.start({"margin-top":0}).chain(function(){this.showSubMenuComplete()}.bind(this))}}else{if(A){this.myEffect.set({"margin-left":0}).chain(function(){this.showSubMenuComplete()}.bind(this))}else{this.myEffect.start({"margin-left":0}).chain(function(){this.showSubMenuComplete()}.bind(this))}}}else{if(this.options.effect==="fade"){if(A){this.myEffect.set({opacity:this.options.opacity}).chain(function(){this.showSubMenuComplete()}.bind(this))}else{this.myEffect.start({opacity:this.options.opacity}).chain(function(){this.showSubMenuComplete()}.bind(this))}}else{if(this.options.effect=="slide & fade"){this.childMenu.setStyles({display:"block",visibility:"visible"});this.childMenu.getFirst().setStyles({left:0});if(this.subMenuType==="initial"&&this.options.orientation==="horizontal"){if(A){this.myEffect.set({"margin-top":0,opacity:this.options.opacity}).chain(function(){this.showSubMenuComplete()}.bind(this))}else{this.myEffect.start({"margin-top":0,opacity:this.options.opacity}).chain(function(){this.showSubMenuComplete()}.bind(this))}}else{if(A){if(this.options.direction.x==="right"){this.myEffect.set({"margin-left":0,opacity:this.options.opacity}).chain(function(){this.showSubMenuComplete()}.bind(this))}else{if(this.options.direction.x==="left"){this.myEffect.set({"margin-left":0,opacity:this.options.opacity}).chain(function(){this.showSubMenuComplete()}.bind(this))}}}else{if(this.options.direction.x==="right"){this.myEffect.set({"margin-left":-this.width,opacity:this.options.opacity});this.myEffect.start({"margin-left":0,opacity:this.options.opacity}).chain(function(){this.showSubMenuComplete()}.bind(this))}else{if(this.options.direction.x==="left"){this.myEffect.start({"margin-left":0,opacity:this.options.opacity}).chain(function(){this.showSubMenuComplete()}.bind(this))}}}}}else{this.childMenu.setStyles({display:"block",visibility:"visible"}).chain(function(){this.showSubMenuComplete(this)}.bind(this))}}}this.childMenu.store("status","open")},showSubMenuComplete:function(){this.options.onShowSubMenu_complete(this)},positionSubMenu:function(){this.options.onPositionSubMenu_begin(this);this.childMenu.setStyle("width",this.width);this.childMenu.getFirst().setStyle("width",this.width);if(this.subMenuType==="subsequent"){if(this.parentSubMenu&&this.options.direction.x!=this.parentSubMenu.options.direction.x){if(this.parentSubMenu.options.direction.x==="left"&&this.options.effect&&this.options.effect.contains("slide")){this.myEffect.set({"margin-left":this.width})}}this.options.direction.x=this.parentSubMenu.options.direction.x;this.options.direction.xInverse=this.parentSubMenu.options.direction.xInverse;this.options.direction.y=this.parentSubMenu.options.direction.y;this.options.direction.yInverse=this.parentSubMenu.options.direction.yInverse}var C;var A;if(this.subMenuType=="initial"){if(this.options.direction.y==="up"){if(this.options.orientation==="vertical"){C=this.btn.getCoordinates().bottom-this.height+this.options.tweakInitial.y}else{C=this.btn.getCoordinates().top-this.height+this.options.tweakInitial.y}this.childMenu.style.top=C+"px"}else{if(this.options.orientation=="horizontal"){this.childMenu.style.top=this.btn.getCoordinates().bottom+this.options.tweakInitial.y+"px"}else{if(this.options.orientation=="vertical"){C=this.btn.getPosition().y+this.options.tweakInitial.y;if((C+this.childMenu.getSize().y)>=$(document.body).getScrollSize().y){A=(C+this.childMenu.getSize().y)-$(document.body).getScrollSize().y;C=C-A-20}this.childMenu.style.top=C+"px"}}}if(this.options.orientation=="horizontal"){this.childMenu.style.left=this.btn.getPosition().x+this.options.tweakInitial.x+"px"}else{if(this.options.direction.x=="left"){this.childMenu.style.left=this.btn.getPosition().x-this.childMenu.getCoordinates().width+this.options.tweakInitial.x+"px"}else{if(this.options.direction.x=="right"){this.childMenu.style.left=this.btn.getCoordinates().right+this.options.tweakInitial.x+"px"}}}}else{if(this.subMenuType=="subsequent"){if(this.options.direction.y==="down"){if((this.btn.getCoordinates().top+this.options.tweakSubsequent.y+this.childMenu.getSize().y)>=$(document.body).getScrollSize().y){A=(this.btn.getCoordinates().top+this.options.tweakSubsequent.y+this.childMenu.getSize().y)-$(document.body).getScrollSize().y;this.childMenu.style.top=(this.btn.getCoordinates().top+this.options.tweakSubsequent.y)-A-20+"px"}else{this.childMenu.style.top=this.btn.getCoordinates().top+this.options.tweakSubsequent.y+"px"}}else{if(this.options.direction.y==="up"){if((this.btn.getCoordinates().bottom-this.height+this.options.tweakSubsequent.y)<1){this.options.direction.y="down";this.options.direction.yInverse="up";this.childMenu.style.top=this.btn.getCoordinates().top+this.options.tweakSubsequent.y+"px"}else{this.childMenu.style.top=this.btn.getCoordinates().bottom-this.height+this.options.tweakSubsequent.y+"px"}}}if(this.options.direction.x=="left"){this.childMenu.style.left=this.btn.getCoordinates().left-this.childMenu.getCoordinates().width+this.options.tweakSubsequent.x+"px";if(this.childMenu.getPosition().x<0){this.options.direction.x="right";this.options.direction.xInverse="left";this.childMenu.style.left=this.btn.getPosition().x+this.btn.getCoordinates().width+this.options.tweakSubsequent.x+"px";if(this.options.effect==="slide"||this.options.effect==="slide & fade"){this.myEffect.set({"margin-left":-this.width,opacity:this.options.opacity})}}}else{if(this.options.direction.x=="right"){this.childMenu.style.left=this.btn.getCoordinates().right+this.options.tweakSubsequent.x+"px";var D=this.childMenu.getCoordinates().right;var B=document.getCoordinates().width+window.getScroll().x;if(D>B){this.options.direction.x="left";this.options.direction.xInverse="right";this.childMenu.style.left=this.btn.getCoordinates().left-this.childMenu.getCoordinates().width+this.options.tweakSubsequent.x+"px";if(this.options.effect==="slide"||this.options.effect==="slide & fade"){this.myEffect.set({"margin-left":this.width,opacity:this.options.opacity})}}}}}}this.options.onPositionSubMenu_complete(this)}});