import{r as Pt,a as Rn,g as Fn,R as Nn}from"./react-c38fdf14.js";import{l as Nt,L as Y,_ as g,p as J,a as $,M as V,G as Q,b as wt,C as it,T as on,c as Dn,d as Bn,e as sn,U as st,f as N,g as rn,h as kn,i as Un,F as Wn,j as ne,k as x,m as Gn,n as E,Q as ve,o as jt,q as Ct,r as an,s as Vn,W as _e,R as jn,t as Dt,u as Hn,v as Zn}from"./deckgl_core-d179406b.js";import{D as qn}from"./deckgl_react-4fdf7a5d.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();var ln={exports:{}},At={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kn=Pt,Xn=Symbol.for("react.element"),Yn=Symbol.for("react.fragment"),Jn=Object.prototype.hasOwnProperty,$n=Kn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Qn={key:!0,ref:!0,__self:!0,__source:!0};function cn(i,t,e){var n,o={},s=null,r=null;e!==void 0&&(s=""+e),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(r=t.ref);for(n in t)Jn.call(t,n)&&!Qn.hasOwnProperty(n)&&(o[n]=t[n]);if(i&&i.defaultProps)for(n in t=i.defaultProps,t)o[n]===void 0&&(o[n]=t[n]);return{$$typeof:Xn,type:i,key:s,ref:r,props:o,_owner:$n.current}}At.Fragment=Yn;At.jsx=cn;At.jsxs=cn;ln.exports=At;var G=ln.exports,Ht={},Pe=Rn;Ht.createRoot=Pe.createRoot,Ht.hydrateRoot=Pe.hydrateRoot;const ti=new Uint16Array([0,2,1,0,3,2]),ei=new Float32Array([0,1,0,0,1,0,1,1]);function ni(i,t){if(!t)return ii(i);const e=Math.max(Math.abs(i[0][0]-i[3][0]),Math.abs(i[1][0]-i[2][0])),n=Math.max(Math.abs(i[1][1]-i[0][1]),Math.abs(i[2][1]-i[3][1])),o=Math.ceil(e/t)+1,s=Math.ceil(n/t)+1,r=(o-1)*(s-1)*6,a=new Uint32Array(r),l=new Float32Array(o*s*2),c=new Float64Array(o*s*3);let u=0,d=0;for(let h=0;h<o;h++){const f=h/(o-1);for(let p=0;p<s;p++){const m=p/(s-1),y=oi(i,f,m);c[u*3+0]=y[0],c[u*3+1]=y[1],c[u*3+2]=y[2]||0,l[u*2+0]=f,l[u*2+1]=1-m,h>0&&p>0&&(a[d++]=u-s,a[d++]=u-s-1,a[d++]=u-1,a[d++]=u-s,a[d++]=u-1,a[d++]=u),u++}}return{vertexCount:r,positions:c,indices:a,texCoords:l}}function ii(i){const t=new Float64Array(12);for(let e=0;e<i.length;e++)t[e*3+0]=i[e][0],t[e*3+1]=i[e][1],t[e*3+2]=i[e][2]||0;return{vertexCount:6,positions:t,indices:ti,texCoords:ei}}function oi(i,t,e){return Nt(Nt(i[0],i[1],e),Nt(i[3],i[2],e),t)}const si=`
#define SHADER_NAME bitmap-layer-vertex-shader

attribute vec2 texCoords;
attribute vec3 positions;
attribute vec3 positions64Low;

varying vec2 vTexCoord;
varying vec2 vTexPos;

uniform float coordinateConversion;

const vec3 pickingColor = vec3(1.0, 0.0, 0.0);

void main(void) {
  geometry.worldPosition = positions;
  geometry.uv = texCoords;
  geometry.pickingColor = pickingColor;

  gl_Position = project_position_to_clipspace(positions, positions64Low, vec3(0.0), geometry.position);
  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);

  vTexCoord = texCoords;

  if (coordinateConversion < -0.5) {
    vTexPos = geometry.position.xy + project_uCommonOrigin.xy;
  } else if (coordinateConversion > 0.5) {
    vTexPos = geometry.worldPosition.xy;
  }

  vec4 color = vec4(0.0);
  DECKGL_FILTER_COLOR(color, geometry);
}
`,ri=`
vec3 packUVsIntoRGB(vec2 uv) {
  // Extract the top 8 bits. We want values to be truncated down so we can add a fraction
  vec2 uv8bit = floor(uv * 256.);

  // Calculate the normalized remainders of u and v parts that do not fit into 8 bits
  // Scale and clamp to 0-1 range
  vec2 uvFraction = fract(uv * 256.);
  vec2 uvFraction4bit = floor(uvFraction * 16.);

  // Remainder can be encoded in blue channel, encode as 4 bits for pixel coordinates
  float fractions = uvFraction4bit.x + uvFraction4bit.y * 16.;

  return vec3(uv8bit, fractions) / 255.;
}
`,ai=`
#define SHADER_NAME bitmap-layer-fragment-shader

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D bitmapTexture;

varying vec2 vTexCoord;
varying vec2 vTexPos;

uniform float desaturate;
uniform vec4 transparentColor;
uniform vec3 tintColor;
uniform float opacity;

uniform float coordinateConversion;
uniform vec4 bounds;

/* projection utils */
const float TILE_SIZE = 512.0;
const float PI = 3.1415926536;
const float WORLD_SCALE = TILE_SIZE / PI / 2.0;

// from degrees to Web Mercator
vec2 lnglat_to_mercator(vec2 lnglat) {
  float x = lnglat.x;
  float y = clamp(lnglat.y, -89.9, 89.9);
  return vec2(
    radians(x) + PI,
    PI + log(tan(PI * 0.25 + radians(y) * 0.5))
  ) * WORLD_SCALE;
}

// from Web Mercator to degrees
vec2 mercator_to_lnglat(vec2 xy) {
  xy /= WORLD_SCALE;
  return degrees(vec2(
    xy.x - PI,
    atan(exp(xy.y - PI)) * 2.0 - PI * 0.5
  ));
}
/* End projection utils */

// apply desaturation
vec3 color_desaturate(vec3 color) {
  float luminance = (color.r + color.g + color.b) * 0.333333333;
  return mix(color, vec3(luminance), desaturate);
}

// apply tint
vec3 color_tint(vec3 color) {
  return color * tintColor;
}

// blend with background color
vec4 apply_opacity(vec3 color, float alpha) {
  if (transparentColor.a == 0.0) {
    return vec4(color, alpha);
  }
  float blendedAlpha = alpha + transparentColor.a * (1.0 - alpha);
  float highLightRatio = alpha / blendedAlpha;
  vec3 blendedRGB = mix(transparentColor.rgb, color, highLightRatio);
  return vec4(blendedRGB, blendedAlpha);
}

vec2 getUV(vec2 pos) {
  return vec2(
    (pos.x - bounds[0]) / (bounds[2] - bounds[0]),
    (pos.y - bounds[3]) / (bounds[1] - bounds[3])
  );
}

`.concat(ri,`

void main(void) {
  vec2 uv = vTexCoord;
  if (coordinateConversion < -0.5) {
    vec2 lnglat = mercator_to_lnglat(vTexPos);
    uv = getUV(lnglat);
  } else if (coordinateConversion > 0.5) {
    vec2 commonPos = lnglat_to_mercator(vTexPos);
    uv = getUV(commonPos);
  }
  vec4 bitmapColor = texture2D(bitmapTexture, uv);

  gl_FragColor = apply_opacity(color_tint(color_desaturate(bitmapColor.rgb)), bitmapColor.a * opacity);

  geometry.uv = uv;
  DECKGL_FILTER_COLOR(gl_FragColor, geometry);

  if (picking_uActive && !picking_uAttribute) {
    // Since instance information is not used, we can use picking color for pixel index
    gl_FragColor.rgb = packUVsIntoRGB(uv);
  }
}
`),li={image:{type:"image",value:null,async:!0},bounds:{type:"array",value:[1,0,0,1],compare:!0},_imageCoordinateSystem:it.DEFAULT,desaturate:{type:"number",min:0,max:1,value:0},transparentColor:{type:"color",value:[0,0,0,0]},tintColor:{type:"color",value:[255,255,255]},textureParameters:{type:"object",ignore:!0}};class ie extends Y{constructor(...t){super(...t),g(this,"state",void 0)}getShaders(){return super.getShaders({vs:si,fs:ai,modules:[J,$]})}initializeState(){const t=this.getAttributeManager();t.remove(["instancePickingColors"]);const e=!0;t.add({indices:{size:1,isIndexed:!0,update:n=>n.value=this.state.mesh.indices,noAlloc:e},positions:{size:3,type:5130,fp64:this.use64bitPositions(),update:n=>n.value=this.state.mesh.positions,noAlloc:e},texCoords:{size:2,update:n=>n.value=this.state.mesh.texCoords,noAlloc:e}})}updateState({props:t,oldProps:e,changeFlags:n}){const o=this.getAttributeManager();if(n.extensionsChanged){var s;const{gl:r}=this.context;(s=this.state.model)===null||s===void 0||s.delete(),this.state.model=this._getModel(r),o.invalidateAll()}if(t.bounds!==e.bounds){const r=this.state.mesh,a=this._createMesh();this.state.model.setVertexCount(a.vertexCount);for(const l in a)r&&r[l]!==a[l]&&o.invalidate(l);this.setState({mesh:a,...this._getCoordinateUniforms()})}else t._imageCoordinateSystem!==e._imageCoordinateSystem&&this.setState(this._getCoordinateUniforms())}getPickingInfo(t){const{image:e}=this.props,n=t.info;if(!n.color||!e)return n.bitmap=null,n;const{width:o,height:s}=e;n.index=0;const r=ci(n.color),a=[Math.floor(r[0]*o),Math.floor(r[1]*s)];return n.bitmap={size:{width:o,height:s},uv:r,pixel:a},n}disablePickingIndex(){this.setState({disablePicking:!0})}restorePickingColors(){this.setState({disablePicking:!1})}_updateAutoHighlight(t){super._updateAutoHighlight({...t,color:this.encodePickingColor(0)})}_createMesh(){const{bounds:t}=this.props;let e=t;return Ce(t)&&(e=[[t[0],t[1]],[t[0],t[3]],[t[2],t[3]],[t[2],t[1]]]),ni(e,this.context.viewport.resolution)}_getModel(t){return t?new V(t,{...this.getShaders(),id:this.props.id,geometry:new Q({drawMode:4,vertexCount:6}),isInstanced:!1}):null}draw(t){const{uniforms:e,moduleParameters:n}=t,{model:o,coordinateConversion:s,bounds:r,disablePicking:a}=this.state,{image:l,desaturate:c,transparentColor:u,tintColor:d}=this.props;n.pickingActive&&a||l&&o&&o.setUniforms(e).setUniforms({bitmapTexture:l,desaturate:c,transparentColor:u.map(h=>h/255),tintColor:d.slice(0,3).map(h=>h/255),coordinateConversion:s,bounds:r}).draw()}_getCoordinateUniforms(){const{LNGLAT:t,CARTESIAN:e,DEFAULT:n}=it;let{_imageCoordinateSystem:o}=this.props;if(o!==n){const{bounds:s}=this.props;if(!Ce(s))throw new Error("_imageCoordinateSystem only supports rectangular bounds");const r=this.context.viewport.resolution?t:e;if(o=o===t?t:e,o===t&&r===e)return{coordinateConversion:-1,bounds:s};if(o===e&&r===t){const a=wt([s[0],s[1]]),l=wt([s[2],s[3]]);return{coordinateConversion:1,bounds:[a[0],a[1],l[0],l[1]]}}}return{coordinateConversion:0,bounds:[0,0,0,0]}}}g(ie,"layerName","BitmapLayer");g(ie,"defaultProps",li);function ci(i){const[t,e,n]=i,o=(n&240)/256,s=(n&15)/16;return[(t+s)/256,(e+o)/256]}function Ce(i){return Number.isFinite(i[0])}const ui=`#define SHADER_NAME icon-layer-vertex-shader

attribute vec2 positions;

attribute vec3 instancePositions;
attribute vec3 instancePositions64Low;
attribute float instanceSizes;
attribute float instanceAngles;
attribute vec4 instanceColors;
attribute vec3 instancePickingColors;
attribute vec4 instanceIconFrames;
attribute float instanceColorModes;
attribute vec2 instanceOffsets;
attribute vec2 instancePixelOffset;

uniform float sizeScale;
uniform vec2 iconsTextureDim;
uniform float sizeMinPixels;
uniform float sizeMaxPixels;
uniform bool billboard;
uniform int sizeUnits;

varying float vColorMode;
varying vec4 vColor;
varying vec2 vTextureCoords;
varying vec2 uv;

vec2 rotate_by_angle(vec2 vertex, float angle) {
  float angle_radian = angle * PI / 180.0;
  float cos_angle = cos(angle_radian);
  float sin_angle = sin(angle_radian);
  mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
  return rotationMatrix * vertex;
}

void main(void) {
  geometry.worldPosition = instancePositions;
  geometry.uv = positions;
  geometry.pickingColor = instancePickingColors;
  uv = positions;

  vec2 iconSize = instanceIconFrames.zw;
  float sizePixels = clamp(
    project_size_to_pixel(instanceSizes * sizeScale, sizeUnits), 
    sizeMinPixels, sizeMaxPixels
  );
  float instanceScale = iconSize.y == 0.0 ? 0.0 : sizePixels / iconSize.y;
  vec2 pixelOffset = positions / 2.0 * iconSize + instanceOffsets;
  pixelOffset = rotate_by_angle(pixelOffset, instanceAngles) * instanceScale;
  pixelOffset += instancePixelOffset;
  pixelOffset.y *= -1.0;

  if (billboard)  {
    gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
    DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
    vec3 offset = vec3(pixelOffset, 0.0);
    DECKGL_FILTER_SIZE(offset, geometry);
    gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);

  } else {
    vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
    DECKGL_FILTER_SIZE(offset_common, geometry);
    gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position); 
    DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
  }

  vTextureCoords = mix(
    instanceIconFrames.xy,
    instanceIconFrames.xy + iconSize,
    (positions.xy + 1.0) / 2.0
  ) / iconsTextureDim;

  vColor = instanceColors;
  DECKGL_FILTER_COLOR(vColor, geometry);

  vColorMode = instanceColorModes;
}
`,di=`#define SHADER_NAME icon-layer-fragment-shader

precision highp float;

uniform float opacity;
uniform sampler2D iconsTexture;
uniform float alphaCutoff;

varying float vColorMode;
varying vec4 vColor;
varying vec2 vTextureCoords;
varying vec2 uv;

void main(void) {
  geometry.uv = uv;

  vec4 texColor = texture2D(iconsTexture, vTextureCoords);
  vec3 color = mix(texColor.rgb, vColor.rgb, vColorMode);
  float a = texColor.a * opacity * vColor.a;

  if (a < alphaCutoff) {
    discard;
  }

  gl_FragColor = vec4(color, a);
  DECKGL_FILTER_COLOR(gl_FragColor, geometry);
}
`,hi=1024,fi=4,Le=()=>{},Se={10241:9987,10240:9729,10242:33071,10243:33071};function gi(i){return Math.pow(2,Math.ceil(Math.log2(i)))}function pi(i,t,e,n){const o=Math.min(e/t.width,n/t.height),s=Math.floor(t.width*o),r=Math.floor(t.height*o);return o===1?{data:t,width:s,height:r}:(i.canvas.height=r,i.canvas.width=s,i.clearRect(0,0,s,r),i.drawImage(t,0,0,t.width,t.height,0,0,s,r),{data:i.canvas,width:s,height:r})}function rt(i){return i&&(i.id||i.url)}function mi(i,t,e,n){const o=i.width,s=i.height,r=new on(i.gl,{width:t,height:e,parameters:n});return Bn(i,r,{targetY:0,width:o,height:s}),i.delete(),r}function be(i,t,e){for(let n=0;n<t.length;n++){const{icon:o,xOffset:s}=t[n],r=rt(o);i[r]={...o,x:s,y:e}}}function yi({icons:i,buffer:t,mapping:e={},xOffset:n=0,yOffset:o=0,rowHeight:s=0,canvasWidth:r}){let a=[];for(let l=0;l<i.length;l++){const c=i[l],u=rt(c);if(!e[u]){const{height:d,width:h}=c;n+h+t>r&&(be(e,a,o),n=0,o=s+o+t,s=0,a=[]),a.push({icon:c,xOffset:n}),n=n+h+t,s=Math.max(s,d)}}return a.length>0&&be(e,a,o),{mapping:e,rowHeight:s,xOffset:n,yOffset:o,canvasWidth:r,canvasHeight:gi(s+o+t)}}function xi(i,t,e){if(!i||!t)return null;e=e||{};const n={},{iterable:o,objectInfo:s}=sn(i);for(const r of o){s.index++;const a=t(r,s),l=rt(a);if(!a)throw new Error("Icon is missing.");if(!a.url)throw new Error("Icon url is missing.");!n[l]&&(!e[l]||a.url!==e[l].url)&&(n[l]={...a,source:r,sourceIndex:s.index})}return n}class vi{constructor(t,{onUpdate:e=Le,onError:n=Le}){g(this,"gl",void 0),g(this,"onUpdate",void 0),g(this,"onError",void 0),g(this,"_loadOptions",null),g(this,"_texture",null),g(this,"_externalTexture",null),g(this,"_mapping",{}),g(this,"_textureParameters",null),g(this,"_pendingCount",0),g(this,"_autoPacking",!1),g(this,"_xOffset",0),g(this,"_yOffset",0),g(this,"_rowHeight",0),g(this,"_buffer",fi),g(this,"_canvasWidth",hi),g(this,"_canvasHeight",0),g(this,"_canvas",null),this.gl=t,this.onUpdate=e,this.onError=n}finalize(){var t;(t=this._texture)===null||t===void 0||t.delete()}getTexture(){return this._texture||this._externalTexture}getIconMapping(t){const e=this._autoPacking?rt(t):t;return this._mapping[e]||{}}setProps({loadOptions:t,autoPacking:e,iconAtlas:n,iconMapping:o,textureParameters:s}){if(t&&(this._loadOptions=t),e!==void 0&&(this._autoPacking=e),o&&(this._mapping=o),n){var r;(r=this._texture)===null||r===void 0||r.delete(),this._texture=null,this._externalTexture=n}s&&(this._textureParameters=s)}get isLoaded(){return this._pendingCount===0}packIcons(t,e){if(!this._autoPacking||typeof document>"u")return;const n=Object.values(xi(t,e,this._mapping)||{});if(n.length>0){const{mapping:o,xOffset:s,yOffset:r,rowHeight:a,canvasHeight:l}=yi({icons:n,buffer:this._buffer,canvasWidth:this._canvasWidth,mapping:this._mapping,rowHeight:this._rowHeight,xOffset:this._xOffset,yOffset:this._yOffset});this._rowHeight=a,this._mapping=o,this._xOffset=s,this._yOffset=r,this._canvasHeight=l,this._texture||(this._texture=new on(this.gl,{width:this._canvasWidth,height:this._canvasHeight,parameters:this._textureParameters||Se})),this._texture.height!==this._canvasHeight&&(this._texture=mi(this._texture,this._canvasWidth,this._canvasHeight,this._textureParameters||Se)),this.onUpdate(),this._canvas=this._canvas||document.createElement("canvas"),this._loadIcons(n)}}_loadIcons(t){const e=this._canvas.getContext("2d",{willReadFrequently:!0});for(const n of t)this._pendingCount++,Dn(n.url,this._loadOptions).then(o=>{const s=rt(n),r=this._mapping[s],{x:a,y:l,width:c,height:u}=r,{data:d,width:h,height:f}=pi(e,o,c,u);this._texture.setSubImageData({data:d,x:a+(c-h)/2,y:l+(u-f)/2,width:h,height:f}),r.width=h,r.height=f,this._texture.generateMipmap(),this.onUpdate()}).catch(o=>{this.onError({url:n.url,source:n.source,sourceIndex:n.sourceIndex,loadOptions:this._loadOptions,error:o})}).finally(()=>{this._pendingCount--})}}const un=[0,0,0,255],_i={iconAtlas:{type:"image",value:null,async:!0},iconMapping:{type:"object",value:{},async:!0},sizeScale:{type:"number",value:1,min:0},billboard:!0,sizeUnits:"pixels",sizeMinPixels:{type:"number",min:0,value:0},sizeMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},alphaCutoff:{type:"number",value:.05,min:0,max:1},getPosition:{type:"accessor",value:i=>i.position},getIcon:{type:"accessor",value:i=>i.icon},getColor:{type:"accessor",value:un},getSize:{type:"accessor",value:1},getAngle:{type:"accessor",value:0},getPixelOffset:{type:"accessor",value:[0,0]},onIconError:{type:"function",value:null,optional:!0},textureParameters:{type:"object",ignore:!0}};class Et extends Y{constructor(...t){super(...t),g(this,"state",void 0)}getShaders(){return super.getShaders({vs:ui,fs:di,modules:[J,$]})}initializeState(){this.state={iconManager:new vi(this.context.gl,{onUpdate:this._onUpdate.bind(this),onError:this._onError.bind(this)})},this.getAttributeManager().addInstanced({instancePositions:{size:3,type:5130,fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceSizes:{size:1,transition:!0,accessor:"getSize",defaultValue:1},instanceOffsets:{size:2,accessor:"getIcon",transform:this.getInstanceOffset},instanceIconFrames:{size:4,accessor:"getIcon",transform:this.getInstanceIconFrame},instanceColorModes:{size:1,type:5121,accessor:"getIcon",transform:this.getInstanceColorMode},instanceColors:{size:this.props.colorFormat.length,type:5121,normalized:!0,transition:!0,accessor:"getColor",defaultValue:un},instanceAngles:{size:1,transition:!0,accessor:"getAngle"},instancePixelOffset:{size:2,transition:!0,accessor:"getPixelOffset"}})}updateState(t){super.updateState(t);const{props:e,oldProps:n,changeFlags:o}=t,s=this.getAttributeManager(),{iconAtlas:r,iconMapping:a,data:l,getIcon:c,textureParameters:u}=e,{iconManager:d}=this.state,h=r||this.internalState.isAsyncPropLoading("iconAtlas");if(d.setProps({loadOptions:e.loadOptions,autoPacking:!h,iconAtlas:r,iconMapping:h?a:null,textureParameters:u}),h?n.iconMapping!==e.iconMapping&&s.invalidate("getIcon"):(o.dataChanged||o.updateTriggersChanged&&(o.updateTriggersChanged.all||o.updateTriggersChanged.getIcon))&&d.packIcons(l,c),o.extensionsChanged){var f;const{gl:p}=this.context;(f=this.state.model)===null||f===void 0||f.delete(),this.state.model=this._getModel(p),s.invalidateAll()}}get isLoaded(){return super.isLoaded&&this.state.iconManager.isLoaded}finalizeState(t){super.finalizeState(t),this.state.iconManager.finalize()}draw({uniforms:t}){const{sizeScale:e,sizeMinPixels:n,sizeMaxPixels:o,sizeUnits:s,billboard:r,alphaCutoff:a}=this.props,{iconManager:l}=this.state,c=l.getTexture();c&&this.state.model.setUniforms(t).setUniforms({iconsTexture:c,iconsTextureDim:[c.width,c.height],sizeUnits:st[s],sizeScale:e,sizeMinPixels:n,sizeMaxPixels:o,billboard:r,alphaCutoff:a}).draw()}_getModel(t){const e=[-1,-1,-1,1,1,1,1,-1];return new V(t,{...this.getShaders(),id:this.props.id,geometry:new Q({drawMode:6,attributes:{positions:{size:2,value:new Float32Array(e)}}}),isInstanced:!0})}_onUpdate(){this.setNeedsRedraw()}_onError(t){var e;const n=(e=this.getCurrentLayer())===null||e===void 0?void 0:e.props.onIconError;n?n(t):N.error(t.error.message)()}getInstanceOffset(t){const{width:e,height:n,anchorX:o=e/2,anchorY:s=n/2}=this.state.iconManager.getIconMapping(t);return[e/2-o,n/2-s]}getInstanceColorMode(t){return this.state.iconManager.getIconMapping(t).mask?1:0}getInstanceIconFrame(t){const{x:e,y:n,width:o,height:s}=this.state.iconManager.getIconMapping(t);return[e,n,o,s]}}g(Et,"defaultProps",_i);g(Et,"layerName","IconLayer");const Pi=`#define SHADER_NAME scatterplot-layer-vertex-shader

attribute vec3 positions;

attribute vec3 instancePositions;
attribute vec3 instancePositions64Low;
attribute float instanceRadius;
attribute float instanceLineWidths;
attribute vec4 instanceFillColors;
attribute vec4 instanceLineColors;
attribute vec3 instancePickingColors;

uniform float opacity;
uniform float radiusScale;
uniform float radiusMinPixels;
uniform float radiusMaxPixels;
uniform float lineWidthScale;
uniform float lineWidthMinPixels;
uniform float lineWidthMaxPixels;
uniform float stroked;
uniform bool filled;
uniform bool antialiasing;
uniform bool billboard;
uniform int radiusUnits;
uniform int lineWidthUnits;

varying vec4 vFillColor;
varying vec4 vLineColor;
varying vec2 unitPosition;
varying float innerUnitRadius;
varying float outerRadiusPixels;


void main(void) {
  geometry.worldPosition = instancePositions;
  outerRadiusPixels = clamp(
    project_size_to_pixel(radiusScale * instanceRadius, radiusUnits),
    radiusMinPixels, radiusMaxPixels
  );
  float lineWidthPixels = clamp(
    project_size_to_pixel(lineWidthScale * instanceLineWidths, lineWidthUnits),
    lineWidthMinPixels, lineWidthMaxPixels
  );
  outerRadiusPixels += stroked * lineWidthPixels / 2.0;
  float edgePadding = antialiasing ? (outerRadiusPixels + SMOOTH_EDGE_RADIUS) / outerRadiusPixels : 1.0;
  unitPosition = edgePadding * positions.xy;
  geometry.uv = unitPosition;
  geometry.pickingColor = instancePickingColors;

  innerUnitRadius = 1.0 - stroked * lineWidthPixels / outerRadiusPixels;
  
  if (billboard) {
    gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
    DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
    vec3 offset = edgePadding * positions * outerRadiusPixels;
    DECKGL_FILTER_SIZE(offset, geometry);
    gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
  } else {
    vec3 offset = edgePadding * positions * project_pixel_size(outerRadiusPixels);
    DECKGL_FILTER_SIZE(offset, geometry);
    gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset, geometry.position);
    DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
  }
  vFillColor = vec4(instanceFillColors.rgb, instanceFillColors.a * opacity);
  DECKGL_FILTER_COLOR(vFillColor, geometry);
  vLineColor = vec4(instanceLineColors.rgb, instanceLineColors.a * opacity);
  DECKGL_FILTER_COLOR(vLineColor, geometry);
}
`,Ci=`#define SHADER_NAME scatterplot-layer-fragment-shader

precision highp float;

uniform bool filled;
uniform float stroked;
uniform bool antialiasing;

varying vec4 vFillColor;
varying vec4 vLineColor;
varying vec2 unitPosition;
varying float innerUnitRadius;
varying float outerRadiusPixels;

void main(void) {
  geometry.uv = unitPosition;

  float distToCenter = length(unitPosition) * outerRadiusPixels;
  float inCircle = antialiasing ? 
    smoothedge(distToCenter, outerRadiusPixels) : 
    step(distToCenter, outerRadiusPixels);

  if (inCircle == 0.0) {
    discard;
  }

  if (stroked > 0.5) {
    float isLine = antialiasing ? 
      smoothedge(innerUnitRadius * outerRadiusPixels, distToCenter) :
      step(innerUnitRadius * outerRadiusPixels, distToCenter);

    if (filled) {
      gl_FragColor = mix(vFillColor, vLineColor, isLine);
    } else {
      if (isLine == 0.0) {
        discard;
      }
      gl_FragColor = vec4(vLineColor.rgb, vLineColor.a * isLine);
    }
  } else if (!filled) {
    discard;
  } else {
    gl_FragColor = vFillColor;
  }

  gl_FragColor.a *= inCircle;
  DECKGL_FILTER_COLOR(gl_FragColor, geometry);
}
`,Te=[0,0,0,255],Li={radiusUnits:"meters",radiusScale:{type:"number",min:0,value:1},radiusMinPixels:{type:"number",min:0,value:0},radiusMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},lineWidthUnits:"meters",lineWidthScale:{type:"number",min:0,value:1},lineWidthMinPixels:{type:"number",min:0,value:0},lineWidthMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},stroked:!1,filled:!0,billboard:!1,antialiasing:!0,getPosition:{type:"accessor",value:i=>i.position},getRadius:{type:"accessor",value:1},getFillColor:{type:"accessor",value:Te},getLineColor:{type:"accessor",value:Te},getLineWidth:{type:"accessor",value:1},strokeWidth:{deprecatedFor:"getLineWidth"},outline:{deprecatedFor:"stroked"},getColor:{deprecatedFor:["getFillColor","getLineColor"]}};class oe extends Y{getShaders(){return super.getShaders({vs:Pi,fs:Ci,modules:[J,$]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:5130,fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceRadius:{size:1,transition:!0,accessor:"getRadius",defaultValue:1},instanceFillColors:{size:this.props.colorFormat.length,transition:!0,normalized:!0,type:5121,accessor:"getFillColor",defaultValue:[0,0,0,255]},instanceLineColors:{size:this.props.colorFormat.length,transition:!0,normalized:!0,type:5121,accessor:"getLineColor",defaultValue:[0,0,0,255]},instanceLineWidths:{size:1,transition:!0,accessor:"getLineWidth",defaultValue:1}})}updateState(t){if(super.updateState(t),t.changeFlags.extensionsChanged){var e;const{gl:n}=this.context;(e=this.state.model)===null||e===void 0||e.delete(),this.state.model=this._getModel(n),this.getAttributeManager().invalidateAll()}}draw({uniforms:t}){const{radiusUnits:e,radiusScale:n,radiusMinPixels:o,radiusMaxPixels:s,stroked:r,filled:a,billboard:l,antialiasing:c,lineWidthUnits:u,lineWidthScale:d,lineWidthMinPixels:h,lineWidthMaxPixels:f}=this.props;this.state.model.setUniforms(t).setUniforms({stroked:r?1:0,filled:a,billboard:l,antialiasing:c,radiusUnits:st[e],radiusScale:n,radiusMinPixels:o,radiusMaxPixels:s,lineWidthUnits:st[u],lineWidthScale:d,lineWidthMinPixels:h,lineWidthMaxPixels:f}).draw()}_getModel(t){const e=[-1,-1,0,1,-1,0,1,1,0,-1,1,0];return new V(t,{...this.getShaders(),id:this.props.id,geometry:new Q({drawMode:6,vertexCount:4,attributes:{positions:{size:3,value:new Float32Array(e)}}}),isInstanced:!0})}}g(oe,"defaultProps",Li);g(oe,"layerName","ScatterplotLayer");const dn={CLOCKWISE:1,COUNTER_CLOCKWISE:-1};function hn(i,t,e={}){return Si(i,e)!==t?(Ti(i,e),!0):!1}function Si(i,t={}){return Math.sign(bi(i,t))}function bi(i,t={}){const{start:e=0,end:n=i.length}=t,o=t.size||2;let s=0;for(let r=e,a=n-o;r<n;r+=o)s+=(i[r]-i[a])*(i[r+1]+i[a+1]),a=r;return s/2}function Ti(i,t){const{start:e=0,end:n=i.length,size:o=2}=t,s=(n-e)/o,r=Math.floor(s/2);for(let a=0;a<r;++a){const l=e+a*o,c=e+(s-1-a)*o;for(let u=0;u<o;++u){const d=i[l+u];i[l+u]=i[c+u],i[c+u]=d}}}function R(i,t){const e=t.length,n=i.length;if(n>0){let o=!0;for(let s=0;s<e;s++)if(i[n-e+s]!==t[s]){o=!1;break}if(o)return!1}for(let o=0;o<e;o++)i[n+o]=t[o];return!0}function Zt(i,t){const e=t.length;for(let n=0;n<e;n++)i[n]=t[n]}function at(i,t,e,n,o=[]){const s=n+t*e;for(let r=0;r<e;r++)o[r]=i[s+r];return o}function qt(i,t,e,n,o=[]){let s,r;if(e&8)s=(n[3]-i[1])/(t[1]-i[1]),r=3;else if(e&4)s=(n[1]-i[1])/(t[1]-i[1]),r=1;else if(e&2)s=(n[2]-i[0])/(t[0]-i[0]),r=2;else if(e&1)s=(n[0]-i[0])/(t[0]-i[0]),r=0;else return null;for(let a=0;a<i.length;a++)o[a]=(r&1)===a?n[r]:s*(t[a]-i[a])+i[a];return o}function Lt(i,t){let e=0;return i[0]<t[0]?e|=1:i[0]>t[2]&&(e|=2),i[1]<t[1]?e|=4:i[1]>t[3]&&(e|=8),e}function fn(i,t){const{size:e=2,broken:n=!1,gridResolution:o=10,gridOffset:s=[0,0],startIndex:r=0,endIndex:a=i.length}=t||{},l=(a-r)/e;let c=[];const u=[c],d=at(i,0,e,r);let h,f;const p=pn(d,o,s,[]),m=[];R(c,d);for(let y=1;y<l;y++){for(h=at(i,y,e,r,h),f=Lt(h,p);f;){qt(d,h,f,p,m);const _=Lt(m,p);_&&(qt(d,m,_,p,m),f=_),R(c,m),Zt(d,m),Ii(p,o,f),n&&c.length>e&&(c=[],u.push(c),R(c,d)),f=Lt(h,p)}R(c,h),Zt(d,h)}return n?u:u[0]}const we=0,wi=1;function dt(i,t){for(let e=0;e<t.length;e++)i.push(t[e]);return i}function gn(i,t=null,e){if(!i.length)return[];const{size:n=2,gridResolution:o=10,gridOffset:s=[0,0],edgeTypes:r=!1}=e||{},a=[],l=[{pos:i,types:r?new Array(i.length/n).fill(wi):null,holes:t||[]}],c=[[],[]];let u=[];for(;l.length;){const{pos:d,types:h,holes:f}=l.shift();Mi(d,n,f[0]||d.length,c),u=pn(c[0],o,s,u);const p=Lt(c[1],u);if(p){let m=Ie(d,h,n,0,f[0]||d.length,u,p);const y={pos:m[0].pos,types:m[0].types,holes:[]},_={pos:m[1].pos,types:m[1].types,holes:[]};l.push(y,_);for(let C=0;C<f.length;C++)m=Ie(d,h,n,f[C],f[C+1]||d.length,u,p),m[0]&&(y.holes.push(y.pos.length),y.pos=dt(y.pos,m[0].pos),r&&(y.types=dt(y.types,m[0].types))),m[1]&&(_.holes.push(_.pos.length),_.pos=dt(_.pos,m[1].pos),r&&(_.types=dt(_.types,m[1].types)))}else{const m={positions:d};r&&(m.edgeTypes=h),f.length&&(m.holeIndices=f),a.push(m)}}return a}function Ie(i,t,e,n,o,s,r){const a=(o-n)/e,l=[],c=[],u=[],d=[],h=[];let f,p,m;const y=at(i,a-1,e,n);let _=Math.sign(r&8?y[1]-s[3]:y[0]-s[2]),C=t&&t[a-1],v=0,P=0;for(let L=0;L<a;L++)f=at(i,L,e,n,f),p=Math.sign(r&8?f[1]-s[3]:f[0]-s[2]),m=t&&t[n/e+L],p&&_&&_!==p&&(qt(y,f,r,s,h),R(l,h)&&u.push(C),R(c,h)&&d.push(C)),p<=0?(R(l,f)&&u.push(m),v-=p):u.length&&(u[u.length-1]=we),p>=0?(R(c,f)&&d.push(m),P+=p):d.length&&(d[d.length-1]=we),Zt(y,f),_=p,C=m;return[v?{pos:l,types:t&&u}:null,P?{pos:c,types:t&&d}:null]}function pn(i,t,e,n){const o=Math.floor((i[0]-e[0])/t)*t+e[0],s=Math.floor((i[1]-e[1])/t)*t+e[1];return n[0]=o,n[1]=s,n[2]=o+t,n[3]=s+t,n}function Ii(i,t,e){e&8?(i[1]+=t,i[3]+=t):e&4?(i[1]-=t,i[3]-=t):e&2?(i[0]+=t,i[2]+=t):e&1&&(i[0]-=t,i[2]-=t)}function Mi(i,t,e,n){let o=1/0,s=-1/0,r=1/0,a=-1/0;for(let l=0;l<e;l+=t){const c=i[l],u=i[l+1];o=c<o?c:o,s=c>s?c:s,r=u<r?u:r,a=u>a?u:a}return n[0][0]=o,n[0][1]=r,n[1][0]=s,n[1][1]=a,n}const Ai=85.051129;function Ei(i,t){const{size:e=2,startIndex:n=0,endIndex:o=i.length,normalize:s=!0}=t||{},r=i.slice(n,o);mn(r,e,0,o-n);const a=fn(r,{size:e,broken:!0,gridResolution:360,gridOffset:[-180,-180]});if(s)for(const l of a)yn(l,e);return a}function Oi(i,t=null,e){const{size:n=2,normalize:o=!0,edgeTypes:s=!1}=e||{};t=t||[];const r=[],a=[];let l=0,c=0;for(let d=0;d<=t.length;d++){const h=t[d]||i.length,f=c,p=zi(i,n,l,h);for(let m=p;m<h;m++)r[c++]=i[m];for(let m=l;m<p;m++)r[c++]=i[m];mn(r,n,f,c),Ri(r,n,f,c,e==null?void 0:e.maxLatitude),l=h,a[d]=c}a.pop();const u=gn(r,a,{size:n,gridResolution:360,gridOffset:[-180,-180],edgeTypes:s});if(o)for(const d of u)yn(d.positions,n);return u}function zi(i,t,e,n){let o=-1,s=-1;for(let r=e+1;r<n;r+=t){const a=Math.abs(i[r]);a>o&&(o=a,s=r-1)}return s}function Ri(i,t,e,n,o=Ai){const s=i[e],r=i[n-t];if(Math.abs(s-r)>180){const a=at(i,0,t,e);a[0]+=Math.round((r-s)/360)*360,R(i,a),a[1]=Math.sign(a[1])*o,R(i,a),a[0]=s,R(i,a)}}function mn(i,t,e,n){let o=i[0],s;for(let r=e;r<n;r+=t){s=i[r];const a=s-o;(a>180||a<-180)&&(s-=Math.round(a/360)*360),i[r]=o=s}}function yn(i,t){let e;const n=i.length/t;for(let s=0;s<n&&(e=i[s*t],(e+180)%360===0);s++);const o=-Math.round(e/360)*360;if(o!==0)for(let s=0;s<n;s++)i[s*t]+=o}function Fi(i,t,e,n){let o;if(Array.isArray(i[0])){const s=i.length*t;o=new Array(s);for(let r=0;r<i.length;r++)for(let a=0;a<t;a++)o[r*t+a]=i[r][a]||0}else o=i;return e?fn(o,{size:t,gridResolution:e}):n?Ei(o,{size:t}):o}const Ni=1,Di=2,Bt=4;class Bi extends rn{constructor(t){super({...t,attributes:{positions:{size:3,padding:18,initialize:!0,type:t.fp64?Float64Array:Float32Array},segmentTypes:{size:1,type:Uint8ClampedArray}}})}get(t){return this.attributes[t]}getGeometryFromBuffer(t){return this.normalize?super.getGeometryFromBuffer(t):null}normalizeGeometry(t){return this.normalize?Fi(t,this.positionSize,this.opts.resolution,this.opts.wrapLongitude):t}getGeometrySize(t){if(Me(t)){let n=0;for(const o of t)n+=this.getGeometrySize(o);return n}const e=this.getPathLength(t);return e<2?0:this.isClosed(t)?e<3?0:e+2:e}updateGeometryAttributes(t,e){if(e.geometrySize!==0)if(t&&Me(t))for(const n of t){const o=this.getGeometrySize(n);e.geometrySize=o,this.updateGeometryAttributes(n,e),e.vertexStart+=o}else this._updateSegmentTypes(t,e),this._updatePositions(t,e)}_updateSegmentTypes(t,e){const n=this.attributes.segmentTypes,o=t?this.isClosed(t):!1,{vertexStart:s,geometrySize:r}=e;n.fill(0,s,s+r),o?(n[s]=Bt,n[s+r-2]=Bt):(n[s]+=Ni,n[s+r-2]+=Di),n[s+r-1]=Bt}_updatePositions(t,e){const{positions:n}=this.attributes;if(!n||!t)return;const{vertexStart:o,geometrySize:s}=e,r=new Array(3);for(let a=o,l=0;l<s;a++,l++)this.getPointOnPath(t,l,r),n[a*3]=r[0],n[a*3+1]=r[1],n[a*3+2]=r[2]}getPathLength(t){return t.length/this.positionSize}getPointOnPath(t,e,n=[]){const{positionSize:o}=this;e*o>=t.length&&(e+=1-t.length/o);const s=e*o;return n[0]=t[s],n[1]=t[s+1],n[2]=o===3&&t[s+2]||0,n}isClosed(t){if(!this.normalize)return!!this.opts.loop;const{positionSize:e}=this,n=t.length-e;return t[0]===t[n]&&t[1]===t[n+1]&&(e===2||t[2]===t[n+2])}}function Me(i){return Array.isArray(i[0])}const ki=`#define SHADER_NAME path-layer-vertex-shader

attribute vec2 positions;

attribute float instanceTypes;
attribute vec3 instanceStartPositions;
attribute vec3 instanceEndPositions;
attribute vec3 instanceLeftPositions;
attribute vec3 instanceRightPositions;
attribute vec3 instanceLeftPositions64Low;
attribute vec3 instanceStartPositions64Low;
attribute vec3 instanceEndPositions64Low;
attribute vec3 instanceRightPositions64Low;
attribute float instanceStrokeWidths;
attribute vec4 instanceColors;
attribute vec3 instancePickingColors;

uniform float widthScale;
uniform float widthMinPixels;
uniform float widthMaxPixels;
uniform float jointType;
uniform float capType;
uniform float miterLimit;
uniform bool billboard;
uniform int widthUnits;

uniform float opacity;

varying vec4 vColor;
varying vec2 vCornerOffset;
varying float vMiterLength;
varying vec2 vPathPosition;
varying float vPathLength;
varying float vJointType;

const float EPSILON = 0.001;
const vec3 ZERO_OFFSET = vec3(0.0);

float flipIfTrue(bool flag) {
  return -(float(flag) * 2. - 1.);
}
vec3 getLineJoinOffset(
  vec3 prevPoint, vec3 currPoint, vec3 nextPoint,
  vec2 width
) {
  bool isEnd = positions.x > 0.0;
  float sideOfPath = positions.y;
  float isJoint = float(sideOfPath == 0.0);

  vec3 deltaA3 = (currPoint - prevPoint);
  vec3 deltaB3 = (nextPoint - currPoint);

  mat3 rotationMatrix;
  bool needsRotation = !billboard && project_needs_rotation(currPoint, rotationMatrix);
  if (needsRotation) {
    deltaA3 = deltaA3 * rotationMatrix;
    deltaB3 = deltaB3 * rotationMatrix;
  }
  vec2 deltaA = deltaA3.xy / width;
  vec2 deltaB = deltaB3.xy / width;

  float lenA = length(deltaA);
  float lenB = length(deltaB);

  vec2 dirA = lenA > 0. ? normalize(deltaA) : vec2(0.0, 0.0);
  vec2 dirB = lenB > 0. ? normalize(deltaB) : vec2(0.0, 0.0);

  vec2 perpA = vec2(-dirA.y, dirA.x);
  vec2 perpB = vec2(-dirB.y, dirB.x);
  vec2 tangent = dirA + dirB;
  tangent = length(tangent) > 0. ? normalize(tangent) : perpA;
  vec2 miterVec = vec2(-tangent.y, tangent.x);
  vec2 dir = isEnd ? dirA : dirB;
  vec2 perp = isEnd ? perpA : perpB;
  float L = isEnd ? lenA : lenB;
  float sinHalfA = abs(dot(miterVec, perp));
  float cosHalfA = abs(dot(dirA, miterVec));
  float turnDirection = flipIfTrue(dirA.x * dirB.y >= dirA.y * dirB.x);
  float cornerPosition = sideOfPath * turnDirection;

  float miterSize = 1.0 / max(sinHalfA, EPSILON);
  miterSize = mix(
    min(miterSize, max(lenA, lenB) / max(cosHalfA, EPSILON)),
    miterSize,
    step(0.0, cornerPosition)
  );

  vec2 offsetVec = mix(miterVec * miterSize, perp, step(0.5, cornerPosition))
    * (sideOfPath + isJoint * turnDirection);
  bool isStartCap = lenA == 0.0 || (!isEnd && (instanceTypes == 1.0 || instanceTypes == 3.0));
  bool isEndCap = lenB == 0.0 || (isEnd && (instanceTypes == 2.0 || instanceTypes == 3.0));
  bool isCap = isStartCap || isEndCap;
  if (isCap) {
    offsetVec = mix(perp * sideOfPath, dir * capType * 4.0 * flipIfTrue(isStartCap), isJoint);
    vJointType = capType;
  } else {
    vJointType = jointType;
  }
  vPathLength = L;
  vCornerOffset = offsetVec;
  vMiterLength = dot(vCornerOffset, miterVec * turnDirection);
  vMiterLength = isCap ? isJoint : vMiterLength;

  vec2 offsetFromStartOfPath = vCornerOffset + deltaA * float(isEnd);
  vPathPosition = vec2(
    dot(offsetFromStartOfPath, perp),
    dot(offsetFromStartOfPath, dir)
  );
  geometry.uv = vPathPosition;

  float isValid = step(instanceTypes, 3.5);
  vec3 offset = vec3(offsetVec * width * isValid, 0.0);

  if (needsRotation) {
    offset = rotationMatrix * offset;
  }
  return offset;
}
void clipLine(inout vec4 position, vec4 refPosition) {
  if (position.w < EPSILON) {
    float r = (EPSILON - refPosition.w) / (position.w - refPosition.w);
    position = refPosition + (position - refPosition) * r;
  }
}

void main() {
  geometry.pickingColor = instancePickingColors;

  vColor = vec4(instanceColors.rgb, instanceColors.a * opacity);

  float isEnd = positions.x;

  vec3 prevPosition = mix(instanceLeftPositions, instanceStartPositions, isEnd);
  vec3 prevPosition64Low = mix(instanceLeftPositions64Low, instanceStartPositions64Low, isEnd);

  vec3 currPosition = mix(instanceStartPositions, instanceEndPositions, isEnd);
  vec3 currPosition64Low = mix(instanceStartPositions64Low, instanceEndPositions64Low, isEnd);

  vec3 nextPosition = mix(instanceEndPositions, instanceRightPositions, isEnd);
  vec3 nextPosition64Low = mix(instanceEndPositions64Low, instanceRightPositions64Low, isEnd);

  geometry.worldPosition = currPosition;
  vec2 widthPixels = vec2(clamp(
    project_size_to_pixel(instanceStrokeWidths * widthScale, widthUnits),
    widthMinPixels, widthMaxPixels) / 2.0);
  vec3 width;

  if (billboard) {
    vec4 prevPositionScreen = project_position_to_clipspace(prevPosition, prevPosition64Low, ZERO_OFFSET);
    vec4 currPositionScreen = project_position_to_clipspace(currPosition, currPosition64Low, ZERO_OFFSET, geometry.position);
    vec4 nextPositionScreen = project_position_to_clipspace(nextPosition, nextPosition64Low, ZERO_OFFSET);

    clipLine(prevPositionScreen, currPositionScreen);
    clipLine(nextPositionScreen, currPositionScreen);
    clipLine(currPositionScreen, mix(nextPositionScreen, prevPositionScreen, isEnd));

    width = vec3(widthPixels, 0.0);
    DECKGL_FILTER_SIZE(width, geometry);

    vec3 offset = getLineJoinOffset(
      prevPositionScreen.xyz / prevPositionScreen.w,
      currPositionScreen.xyz / currPositionScreen.w,
      nextPositionScreen.xyz / nextPositionScreen.w,
      project_pixel_size_to_clipspace(width.xy)
    );

    DECKGL_FILTER_GL_POSITION(currPositionScreen, geometry);
    gl_Position = vec4(currPositionScreen.xyz + offset * currPositionScreen.w, currPositionScreen.w);
  } else {
    prevPosition = project_position(prevPosition, prevPosition64Low);
    currPosition = project_position(currPosition, currPosition64Low);
    nextPosition = project_position(nextPosition, nextPosition64Low);

    width = vec3(project_pixel_size(widthPixels), 0.0);
    DECKGL_FILTER_SIZE(width, geometry);

    vec3 offset = getLineJoinOffset(prevPosition, currPosition, nextPosition, width.xy);
    geometry.position = vec4(currPosition + offset, 1.0);
    gl_Position = project_common_position_to_clipspace(geometry.position);
    DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
  }
  DECKGL_FILTER_COLOR(vColor, geometry);
}
`,Ui=`#define SHADER_NAME path-layer-fragment-shader

precision highp float;

uniform float miterLimit;

varying vec4 vColor;
varying vec2 vCornerOffset;
varying float vMiterLength;
varying vec2 vPathPosition;
varying float vPathLength;
varying float vJointType;

void main(void) {
  geometry.uv = vPathPosition;

  if (vPathPosition.y < 0.0 || vPathPosition.y > vPathLength) {
    if (vJointType > 0.5 && length(vCornerOffset) > 1.0) {
      discard;
    }
    if (vJointType < 0.5 && vMiterLength > miterLimit + 1.0) {
      discard;
    }
  }
  gl_FragColor = vColor;

  DECKGL_FILTER_COLOR(gl_FragColor, geometry);
}
`,xn=[0,0,0,255],Wi={widthUnits:"meters",widthScale:{type:"number",min:0,value:1},widthMinPixels:{type:"number",min:0,value:0},widthMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},jointRounded:!1,capRounded:!1,miterLimit:{type:"number",min:0,value:4},billboard:!1,_pathType:null,getPath:{type:"accessor",value:i=>i.path},getColor:{type:"accessor",value:xn},getWidth:{type:"accessor",value:1},rounded:{deprecatedFor:["jointRounded","capRounded"]}},kt={enter:(i,t)=>t.length?t.subarray(t.length-i.length):i};class se extends Y{constructor(...t){super(...t),g(this,"state",void 0)}getShaders(){return super.getShaders({vs:ki,fs:Ui,modules:[J,$]})}get wrapLongitude(){return!1}initializeState(){this.getAttributeManager().addInstanced({positions:{size:3,vertexOffset:1,type:5130,fp64:this.use64bitPositions(),transition:kt,accessor:"getPath",update:this.calculatePositions,noAlloc:!0,shaderAttributes:{instanceLeftPositions:{vertexOffset:0},instanceStartPositions:{vertexOffset:1},instanceEndPositions:{vertexOffset:2},instanceRightPositions:{vertexOffset:3}}},instanceTypes:{size:1,type:5121,update:this.calculateSegmentTypes,noAlloc:!0},instanceStrokeWidths:{size:1,accessor:"getWidth",transition:kt,defaultValue:1},instanceColors:{size:this.props.colorFormat.length,type:5121,normalized:!0,accessor:"getColor",transition:kt,defaultValue:xn},instancePickingColors:{size:3,type:5121,accessor:(n,{index:o,target:s})=>this.encodePickingColor(n&&n.__source?n.__source.index:o,s)}}),this.setState({pathTesselator:new Bi({fp64:this.use64bitPositions()})})}updateState(t){super.updateState(t);const{props:e,changeFlags:n}=t,o=this.getAttributeManager();if(n.dataChanged||n.updateTriggersChanged&&(n.updateTriggersChanged.all||n.updateTriggersChanged.getPath)){const{pathTesselator:a}=this.state,l=e.data.attributes||{};a.updateGeometry({data:e.data,geometryBuffer:l.getPath,buffers:l,normalize:!e._pathType,loop:e._pathType==="loop",getGeometry:e.getPath,positionFormat:e.positionFormat,wrapLongitude:e.wrapLongitude,resolution:this.context.viewport.resolution,dataChanged:n.dataChanged}),this.setState({numInstances:a.instanceCount,startIndices:a.vertexStarts}),n.dataChanged||o.invalidateAll()}if(n.extensionsChanged){var r;const{gl:a}=this.context;(r=this.state.model)===null||r===void 0||r.delete(),this.state.model=this._getModel(a),o.invalidateAll()}}getPickingInfo(t){const e=super.getPickingInfo(t),{index:n}=e,{data:o}=this.props;return o[0]&&o[0].__source&&(e.object=o.find(s=>s.__source.index===n)),e}disablePickingIndex(t){const{data:e}=this.props;if(e[0]&&e[0].__source)for(let n=0;n<e.length;n++)e[n].__source.index===t&&this._disablePickingIndex(n);else super.disablePickingIndex(t)}draw({uniforms:t}){const{jointRounded:e,capRounded:n,billboard:o,miterLimit:s,widthUnits:r,widthScale:a,widthMinPixels:l,widthMaxPixels:c}=this.props;this.state.model.setUniforms(t).setUniforms({jointType:Number(e),capType:Number(n),billboard:o,widthUnits:st[r],widthScale:a,miterLimit:s,widthMinPixels:l,widthMaxPixels:c}).draw()}_getModel(t){const e=[0,1,2,1,4,2,1,3,4,3,5,4],n=[0,0,0,-1,0,1,1,-1,1,1,1,0];return new V(t,{...this.getShaders(),id:this.props.id,geometry:new Q({drawMode:4,attributes:{indices:new Uint16Array(e),positions:{value:new Float32Array(n),size:2}}}),isInstanced:!0})}calculatePositions(t){const{pathTesselator:e}=this.state;t.startIndices=e.vertexStarts,t.value=e.get("positions")}calculateSegmentTypes(t){const{pathTesselator:e}=this.state;t.startIndices=e.vertexStarts,t.value=e.get("segmentTypes")}}g(se,"defaultProps",Wi);g(se,"layerName","PathLayer");var re={exports:{}};re.exports=Ot;re.exports.default=Ot;function Ot(i,t,e){e=e||2;var n=t&&t.length,o=n?t[0]*e:i.length,s=vn(i,0,o,e,!0),r=[];if(!s||s.next===s.prev)return r;var a,l,c,u,d,h,f;if(n&&(s=Zi(i,t,s,e)),i.length>80*e){a=c=i[0],l=u=i[1];for(var p=e;p<o;p+=e)d=i[p],h=i[p+1],d<a&&(a=d),h<l&&(l=h),d>c&&(c=d),h>u&&(u=h);f=Math.max(c-a,u-l),f=f!==0?32767/f:0}return lt(s,r,e,a,l,f,0),r}function vn(i,t,e,n,o){var s,r;if(o===Yt(i,t,e,n)>0)for(s=t;s<e;s+=n)r=Ae(s,i[s],i[s+1],r);else for(s=e-n;s>=t;s-=n)r=Ae(s,i[s],i[s+1],r);return r&&zt(r,r.next)&&(ut(r),r=r.next),r}function j(i,t){if(!i)return i;t||(t=i);var e=i,n;do if(n=!1,!e.steiner&&(zt(e,e.next)||S(e.prev,e,e.next)===0)){if(ut(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function lt(i,t,e,n,o,s,r){if(i){!r&&s&&Ji(i,n,o,s);for(var a=i,l,c;i.prev!==i.next;){if(l=i.prev,c=i.next,s?Vi(i,n,o,s):Gi(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),ut(i),i=c.next,a=c.next;continue}if(i=c,i===a){r?r===1?(i=ji(j(i),t,e),lt(i,t,e,n,o,s,2)):r===2&&Hi(i,t,e,n,o,s):lt(j(i),t,e,n,o,s,1);break}}}}function Gi(i){var t=i.prev,e=i,n=i.next;if(S(t,e,n)>=0)return!1;for(var o=t.x,s=e.x,r=n.x,a=t.y,l=e.y,c=n.y,u=o<s?o<r?o:r:s<r?s:r,d=a<l?a<c?a:c:l<c?l:c,h=o>s?o>r?o:r:s>r?s:r,f=a>l?a>c?a:c:l>c?l:c,p=n.next;p!==t;){if(p.x>=u&&p.x<=h&&p.y>=d&&p.y<=f&&H(o,a,s,l,r,c,p.x,p.y)&&S(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Vi(i,t,e,n){var o=i.prev,s=i,r=i.next;if(S(o,s,r)>=0)return!1;for(var a=o.x,l=s.x,c=r.x,u=o.y,d=s.y,h=r.y,f=a<l?a<c?a:c:l<c?l:c,p=u<d?u<h?u:h:d<h?d:h,m=a>l?a>c?a:c:l>c?l:c,y=u>d?u>h?u:h:d>h?d:h,_=Kt(f,p,t,e,n),C=Kt(m,y,t,e,n),v=i.prevZ,P=i.nextZ;v&&v.z>=_&&P&&P.z<=C;){if(v.x>=f&&v.x<=m&&v.y>=p&&v.y<=y&&v!==o&&v!==r&&H(a,u,l,d,c,h,v.x,v.y)&&S(v.prev,v,v.next)>=0||(v=v.prevZ,P.x>=f&&P.x<=m&&P.y>=p&&P.y<=y&&P!==o&&P!==r&&H(a,u,l,d,c,h,P.x,P.y)&&S(P.prev,P,P.next)>=0))return!1;P=P.nextZ}for(;v&&v.z>=_;){if(v.x>=f&&v.x<=m&&v.y>=p&&v.y<=y&&v!==o&&v!==r&&H(a,u,l,d,c,h,v.x,v.y)&&S(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;P&&P.z<=C;){if(P.x>=f&&P.x<=m&&P.y>=p&&P.y<=y&&P!==o&&P!==r&&H(a,u,l,d,c,h,P.x,P.y)&&S(P.prev,P,P.next)>=0)return!1;P=P.nextZ}return!0}function ji(i,t,e){var n=i;do{var o=n.prev,s=n.next.next;!zt(o,s)&&_n(o,n,n.next,s)&&ct(o,s)&&ct(s,o)&&(t.push(o.i/e|0),t.push(n.i/e|0),t.push(s.i/e|0),ut(n),ut(n.next),n=i=s),n=n.next}while(n!==i);return j(n)}function Hi(i,t,e,n,o,s){var r=i;do{for(var a=r.next.next;a!==r.prev;){if(r.i!==a.i&&to(r,a)){var l=Pn(r,a);r=j(r,r.next),l=j(l,l.next),lt(r,t,e,n,o,s,0),lt(l,t,e,n,o,s,0);return}a=a.next}r=r.next}while(r!==i)}function Zi(i,t,e,n){var o=[],s,r,a,l,c;for(s=0,r=t.length;s<r;s++)a=t[s]*n,l=s<r-1?t[s+1]*n:i.length,c=vn(i,a,l,n,!1),c===c.next&&(c.steiner=!0),o.push(Qi(c));for(o.sort(qi),s=0;s<o.length;s++)e=Ki(o[s],e);return e}function qi(i,t){return i.x-t.x}function Ki(i,t){var e=Xi(i,t);if(!e)return t;var n=Pn(e,i);return j(n,n.next),j(e,e.next)}function Xi(i,t){var e=t,n=i.x,o=i.y,s=-1/0,r;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){var a=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(a<=n&&a>s&&(s=a,r=e.x<e.next.x?e:e.next,a===n))return r}e=e.next}while(e!==t);if(!r)return null;var l=r,c=r.x,u=r.y,d=1/0,h;e=r;do n>=e.x&&e.x>=c&&n!==e.x&&H(o<u?n:s,o,c,u,o<u?s:n,o,e.x,e.y)&&(h=Math.abs(o-e.y)/(n-e.x),ct(e,i)&&(h<d||h===d&&(e.x>r.x||e.x===r.x&&Yi(r,e)))&&(r=e,d=h)),e=e.next;while(e!==l);return r}function Yi(i,t){return S(i.prev,i,t.prev)<0&&S(t.next,i,i.next)<0}function Ji(i,t,e,n){var o=i;do o.z===0&&(o.z=Kt(o.x,o.y,t,e,n)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next;while(o!==i);o.prevZ.nextZ=null,o.prevZ=null,$i(o)}function $i(i){var t,e,n,o,s,r,a,l,c=1;do{for(e=i,i=null,s=null,r=0;e;){for(r++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(o=e,e=e.nextZ,a--):(o=n,n=n.nextZ,l--),s?s.nextZ=o:i=o,o.prevZ=s,s=o;e=n}s.nextZ=null,c*=2}while(r>1);return i}function Kt(i,t,e,n,o){return i=(i-e)*o|0,t=(t-n)*o|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Qi(i){var t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function H(i,t,e,n,o,s,r,a){return(o-r)*(t-a)>=(i-r)*(s-a)&&(i-r)*(n-a)>=(e-r)*(t-a)&&(e-r)*(s-a)>=(o-r)*(n-a)}function to(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!eo(i,t)&&(ct(i,t)&&ct(t,i)&&no(i,t)&&(S(i.prev,i,t.prev)||S(i,t.prev,t))||zt(i,t)&&S(i.prev,i,i.next)>0&&S(t.prev,t,t.next)>0)}function S(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function zt(i,t){return i.x===t.x&&i.y===t.y}function _n(i,t,e,n){var o=ft(S(i,t,e)),s=ft(S(i,t,n)),r=ft(S(e,n,i)),a=ft(S(e,n,t));return!!(o!==s&&r!==a||o===0&&ht(i,e,t)||s===0&&ht(i,n,t)||r===0&&ht(e,i,n)||a===0&&ht(e,t,n))}function ht(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function ft(i){return i>0?1:i<0?-1:0}function eo(i,t){var e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&_n(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function ct(i,t){return S(i.prev,i,i.next)<0?S(i,t,i.next)>=0&&S(i,i.prev,t)>=0:S(i,t,i.prev)<0||S(i,i.next,t)<0}function no(i,t){var e=i,n=!1,o=(i.x+t.x)/2,s=(i.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&o<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Pn(i,t){var e=new Xt(i.i,i.x,i.y),n=new Xt(t.i,t.x,t.y),o=i.next,s=t.prev;return i.next=t,t.prev=i,e.next=o,o.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Ae(i,t,e,n){var o=new Xt(i,t,e);return n?(o.next=n.next,o.prev=n,n.next.prev=o,n.next=o):(o.prev=o,o.next=o),o}function ut(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Xt(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}Ot.deviation=function(i,t,e,n){var o=t&&t.length,s=o?t[0]*e:i.length,r=Math.abs(Yt(i,0,s,e));if(o)for(var a=0,l=t.length;a<l;a++){var c=t[a]*e,u=a<l-1?t[a+1]*e:i.length;r-=Math.abs(Yt(i,c,u,e))}var d=0;for(a=0;a<n.length;a+=3){var h=n[a]*e,f=n[a+1]*e,p=n[a+2]*e;d+=Math.abs((i[h]-i[p])*(i[f+1]-i[h+1])-(i[h]-i[f])*(i[p+1]-i[h+1]))}return r===0&&d===0?0:Math.abs((d-r)/r)};function Yt(i,t,e,n){for(var o=0,s=t,r=e-n;s<e;s+=n)o+=(i[r]-i[s])*(i[s+1]+i[r+1]),r=s;return o}Ot.flatten=function(i){for(var t=i[0][0].length,e={vertices:[],holes:[],dimensions:t},n=0,o=0;o<i.length;o++){for(var s=0;s<i[o].length;s++)for(var r=0;r<t;r++)e.vertices.push(i[o][s][r]);o>0&&(n+=i[o-1].length,e.holes.push(n))}return e};var io=re.exports;const oo=Fn(io),gt=dn.CLOCKWISE,Ee=dn.COUNTER_CLOCKWISE,W={isClosed:!0};function so(i){if(i=i&&i.positions||i,!Array.isArray(i)&&!ArrayBuffer.isView(i))throw new Error("invalid polygon")}function nt(i){return"positions"in i?i.positions:i}function St(i){return"holeIndices"in i?i.holeIndices:null}function ro(i){return Array.isArray(i[0])}function ao(i){return i.length>=1&&i[0].length>=2&&Number.isFinite(i[0][0])}function lo(i){const t=i[0],e=i[i.length-1];return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}function co(i,t,e,n){for(let o=0;o<t;o++)if(i[e+o]!==i[n-t+o])return!1;return!0}function Oe(i,t,e,n,o){let s=t;const r=e.length;for(let a=0;a<r;a++)for(let l=0;l<n;l++)i[s++]=e[a][l]||0;if(!lo(e))for(let a=0;a<n;a++)i[s++]=e[0][a]||0;return W.start=t,W.end=s,W.size=n,hn(i,o,W),s}function ze(i,t,e,n,o=0,s,r){s=s||e.length;const a=s-o;if(a<=0)return t;let l=t;for(let c=0;c<a;c++)i[l++]=e[o+c];if(!co(e,n,o,s))for(let c=0;c<n;c++)i[l++]=e[o+c];return W.start=t,W.end=l,W.size=n,hn(i,r,W),l}function uo(i,t){so(i);const e=[],n=[];if("positions"in i){const{positions:o,holeIndices:s}=i;if(s){let r=0;for(let a=0;a<=s.length;a++)r=ze(e,r,o,t,s[a-1],s[a],a===0?gt:Ee),n.push(r);return n.pop(),{positions:e,holeIndices:n}}i=o}if(!ro(i))return ze(e,0,i,t,0,e.length,gt),e;if(!ao(i)){let o=0;for(const[s,r]of i.entries())o=Oe(e,o,r,t,s===0?gt:Ee),n.push(o);return n.pop(),{positions:e,holeIndices:n}}return Oe(e,0,i,t,gt),e}function Ut(i,t,e){const n=i.length/3;let o=0;for(let s=0;s<n;s++){const r=(s+1)%n;o+=i[s*3+t]*i[r*3+e],o-=i[r*3+t]*i[s*3+e]}return Math.abs(o/2)}function Re(i,t,e,n){const o=i.length/3;for(let s=0;s<o;s++){const r=s*3,a=i[r+0],l=i[r+1],c=i[r+2];i[r+t]=a,i[r+e]=l,i[r+n]=c}}function ho(i,t,e,n){let o=St(i);o&&(o=o.map(a=>a/t));let s=nt(i);const r=n&&t===3;if(e){const a=s.length;s=s.slice();const l=[];for(let c=0;c<a;c+=t){l[0]=s[c],l[1]=s[c+1],r&&(l[2]=s[c+2]);const u=e(l);s[c]=u[0],s[c+1]=u[1],r&&(s[c+2]=u[2])}}if(r){const a=Ut(s,0,1),l=Ut(s,0,2),c=Ut(s,1,2);if(!a&&!l&&!c)return[];a>l&&a>c||(l>c?(e||(s=s.slice()),Re(s,0,2,1)):(e||(s=s.slice()),Re(s,2,0,1)))}return oo(s,o,t)}class fo extends rn{constructor(t){const{fp64:e,IndexType:n=Uint32Array}=t;super({...t,attributes:{positions:{size:3,type:e?Float64Array:Float32Array},vertexValid:{type:Uint8ClampedArray,size:1},indices:{type:n,size:1}}})}get(t){const{attributes:e}=this;return t==="indices"?e.indices&&e.indices.subarray(0,this.vertexCount):e[t]}updateGeometry(t){super.updateGeometry(t);const e=this.buffers.indices;if(e)this.vertexCount=(e.value||e).length;else if(this.data&&!this.getGeometry)throw new Error("missing indices buffer")}normalizeGeometry(t){if(this.normalize){const e=uo(t,this.positionSize);return this.opts.resolution?gn(nt(e),St(e),{size:this.positionSize,gridResolution:this.opts.resolution,edgeTypes:!0}):this.opts.wrapLongitude?Oi(nt(e),St(e),{size:this.positionSize,maxLatitude:86,edgeTypes:!0}):e}return t}getGeometrySize(t){if(Fe(t)){let e=0;for(const n of t)e+=this.getGeometrySize(n);return e}return nt(t).length/this.positionSize}getGeometryFromBuffer(t){return this.normalize||!this.buffers.indices?super.getGeometryFromBuffer(t):null}updateGeometryAttributes(t,e){if(t&&Fe(t))for(const n of t){const o=this.getGeometrySize(n);e.geometrySize=o,this.updateGeometryAttributes(n,e),e.vertexStart+=o,e.indexStart=this.indexStarts[e.geometryIndex+1]}else this._updateIndices(t,e),this._updatePositions(t,e),this._updateVertexValid(t,e)}_updateIndices(t,{geometryIndex:e,vertexStart:n,indexStart:o}){const{attributes:s,indexStarts:r,typedArrayManager:a}=this;let l=s.indices;if(!l||!t)return;let c=o;const u=ho(t,this.positionSize,this.opts.preproject,this.opts.full3d);l=a.allocate(l,o+u.length,{copy:!0});for(let d=0;d<u.length;d++)l[c++]=u[d]+n;r[e+1]=o+u.length,s.indices=l}_updatePositions(t,{vertexStart:e,geometrySize:n}){const{attributes:{positions:o},positionSize:s}=this;if(!o||!t)return;const r=nt(t);for(let a=e,l=0;l<n;a++,l++){const c=r[l*s],u=r[l*s+1],d=s>2?r[l*s+2]:0;o[a*3]=c,o[a*3+1]=u,o[a*3+2]=d}}_updateVertexValid(t,{vertexStart:e,geometrySize:n}){const{positionSize:o}=this,s=this.attributes.vertexValid,r=t&&St(t);if(t&&t.edgeTypes?s.set(t.edgeTypes,e):s.fill(1,e,e+n),r)for(let a=0;a<r.length;a++)s[e+r[a]/o-1]=0;s[e+n-1]=0}}function Fe(i){return Array.isArray(i)&&i.length>0&&!Number.isFinite(i[0])}const Cn=`
attribute vec2 vertexPositions;
attribute float vertexValid;

uniform bool extruded;
uniform bool isWireframe;
uniform float elevationScale;
uniform float opacity;

varying vec4 vColor;

struct PolygonProps {
  vec4 fillColors;
  vec4 lineColors;
  vec3 positions;
  vec3 nextPositions;
  vec3 pickingColors;
  vec3 positions64Low;
  vec3 nextPositions64Low;
  float elevations;
};

vec3 project_offset_normal(vec3 vector) {
  if (project_uCoordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
    project_uCoordinateSystem == COORDINATE_SYSTEM_LNGLAT_OFFSETS) {
    return normalize(vector * project_uCommonUnitsPerWorldUnit);
  }
  return project_normal(vector);
}

void calculatePosition(PolygonProps props) {
#ifdef IS_SIDE_VERTEX
  if(vertexValid < 0.5){
    gl_Position = vec4(0.);
    return;
  }
#endif

  vec3 pos;
  vec3 pos64Low;
  vec3 normal;
  vec4 colors = isWireframe ? props.lineColors : props.fillColors;

  geometry.worldPosition = props.positions;
  geometry.worldPositionAlt = props.nextPositions;
  geometry.pickingColor = props.pickingColors;

#ifdef IS_SIDE_VERTEX
  pos = mix(props.positions, props.nextPositions, vertexPositions.x);
  pos64Low = mix(props.positions64Low, props.nextPositions64Low, vertexPositions.x);
#else
  pos = props.positions;
  pos64Low = props.positions64Low;
#endif

  if (extruded) {
    pos.z += props.elevations * vertexPositions.y * elevationScale;
  }
  gl_Position = project_position_to_clipspace(pos, pos64Low, vec3(0.), geometry.position);

  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);

  if (extruded) {
  #ifdef IS_SIDE_VERTEX
    normal = vec3(
      props.positions.y - props.nextPositions.y + (props.positions64Low.y - props.nextPositions64Low.y),
      props.nextPositions.x - props.positions.x + (props.nextPositions64Low.x - props.positions64Low.x),
      0.0);
    normal = project_offset_normal(normal);
  #else
    normal = project_normal(vec3(0.0, 0.0, 1.0));
  #endif
    geometry.normal = normal;
    vec3 lightColor = lighting_getLightColor(colors.rgb, project_uCameraPosition, geometry.position.xyz, normal);
    vColor = vec4(lightColor, colors.a * opacity);
  } else {
    vColor = vec4(colors.rgb, colors.a * opacity);
  }
  DECKGL_FILTER_COLOR(vColor, geometry);
}
`,go=`#define SHADER_NAME solid-polygon-layer-vertex-shader

attribute vec3 positions;
attribute vec3 positions64Low;
attribute float elevations;
attribute vec4 fillColors;
attribute vec4 lineColors;
attribute vec3 pickingColors;

`.concat(Cn,`

void main(void) {
  PolygonProps props;

  props.positions = positions;
  props.positions64Low = positions64Low;
  props.elevations = elevations;
  props.fillColors = fillColors;
  props.lineColors = lineColors;
  props.pickingColors = pickingColors;

  calculatePosition(props);
}
`),po=`#define SHADER_NAME solid-polygon-layer-vertex-shader-side
#define IS_SIDE_VERTEX


attribute vec3 instancePositions;
attribute vec3 nextPositions;
attribute vec3 instancePositions64Low;
attribute vec3 nextPositions64Low;
attribute float instanceElevations;
attribute vec4 instanceFillColors;
attribute vec4 instanceLineColors;
attribute vec3 instancePickingColors;

`.concat(Cn,`

void main(void) {
  PolygonProps props;

  #if RING_WINDING_ORDER_CW == 1
    props.positions = instancePositions;
    props.positions64Low = instancePositions64Low;
    props.nextPositions = nextPositions;
    props.nextPositions64Low = nextPositions64Low;
  #else
    props.positions = nextPositions;
    props.positions64Low = nextPositions64Low;
    props.nextPositions = instancePositions;
    props.nextPositions64Low = instancePositions64Low;
  #endif
  props.elevations = instanceElevations;
  props.fillColors = instanceFillColors;
  props.lineColors = instanceLineColors;
  props.pickingColors = instancePickingColors;

  calculatePosition(props);
}
`),mo=`#define SHADER_NAME solid-polygon-layer-fragment-shader

precision highp float;

varying vec4 vColor;

void main(void) {
  gl_FragColor = vColor;

  DECKGL_FILTER_COLOR(gl_FragColor, geometry);
}
`,It=[0,0,0,255],yo={filled:!0,extruded:!1,wireframe:!1,_normalize:!0,_windingOrder:"CW",_full3d:!1,elevationScale:{type:"number",min:0,value:1},getPolygon:{type:"accessor",value:i=>i.polygon},getElevation:{type:"accessor",value:1e3},getFillColor:{type:"accessor",value:It},getLineColor:{type:"accessor",value:It},material:!0},pt={enter:(i,t)=>t.length?t.subarray(t.length-i.length):i};class ae extends Y{constructor(...t){super(...t),g(this,"state",void 0)}getShaders(t){return super.getShaders({vs:t==="top"?go:po,fs:mo,defines:{RING_WINDING_ORDER_CW:!this.props._normalize&&this.props._windingOrder==="CCW"?0:1},modules:[J,kn,$]})}get wrapLongitude(){return!1}initializeState(){const{gl:t,viewport:e}=this.context;let{coordinateSystem:n}=this.props;const{_full3d:o}=this.props;e.isGeospatial&&n===it.DEFAULT&&(n=it.LNGLAT);let s;n===it.LNGLAT&&(o?s=e.projectPosition.bind(e):s=e.projectFlat.bind(e)),this.setState({numInstances:0,polygonTesselator:new fo({preproject:s,fp64:this.use64bitPositions(),IndexType:!t||Un(t,Wn.ELEMENT_INDEX_UINT32)?Uint32Array:Uint16Array})});const r=this.getAttributeManager(),a=!0;r.remove(["instancePickingColors"]),r.add({indices:{size:1,isIndexed:!0,update:this.calculateIndices,noAlloc:a},positions:{size:3,type:5130,fp64:this.use64bitPositions(),transition:pt,accessor:"getPolygon",update:this.calculatePositions,noAlloc:a,shaderAttributes:{positions:{vertexOffset:0,divisor:0},instancePositions:{vertexOffset:0,divisor:1},nextPositions:{vertexOffset:1,divisor:1}}},vertexValid:{size:1,divisor:1,type:5121,update:this.calculateVertexValid,noAlloc:a},elevations:{size:1,transition:pt,accessor:"getElevation",shaderAttributes:{elevations:{divisor:0},instanceElevations:{divisor:1}}},fillColors:{size:this.props.colorFormat.length,type:5121,normalized:!0,transition:pt,accessor:"getFillColor",defaultValue:It,shaderAttributes:{fillColors:{divisor:0},instanceFillColors:{divisor:1}}},lineColors:{size:this.props.colorFormat.length,type:5121,normalized:!0,transition:pt,accessor:"getLineColor",defaultValue:It,shaderAttributes:{lineColors:{divisor:0},instanceLineColors:{divisor:1}}},pickingColors:{size:3,type:5121,accessor:(l,{index:c,target:u})=>this.encodePickingColor(l&&l.__source?l.__source.index:c,u),shaderAttributes:{pickingColors:{divisor:0},instancePickingColors:{divisor:1}}}})}getPickingInfo(t){const e=super.getPickingInfo(t),{index:n}=e,{data:o}=this.props;return o[0]&&o[0].__source&&(e.object=o.find(s=>s.__source.index===n)),e}disablePickingIndex(t){const{data:e}=this.props;if(e[0]&&e[0].__source)for(let n=0;n<e.length;n++)e[n].__source.index===t&&this._disablePickingIndex(n);else super.disablePickingIndex(t)}draw({uniforms:t}){const{extruded:e,filled:n,wireframe:o,elevationScale:s}=this.props,{topModel:r,sideModel:a,polygonTesselator:l}=this.state,c={...t,extruded:!!e,elevationScale:s};a&&(a.setInstanceCount(l.instanceCount-1),a.setUniforms(c),o&&(a.setDrawMode(3),a.setUniforms({isWireframe:!0}).draw()),n&&(a.setDrawMode(6),a.setUniforms({isWireframe:!1}).draw())),r&&(r.setVertexCount(l.vertexCount),r.setUniforms(c).draw())}updateState(t){super.updateState(t),this.updateGeometry(t);const{props:e,oldProps:n,changeFlags:o}=t,s=this.getAttributeManager();if(o.extensionsChanged||e.filled!==n.filled||e.extruded!==n.extruded){var a;(a=this.state.models)===null||a===void 0||a.forEach(l=>l.delete()),this.setState(this._getModels(this.context.gl)),s.invalidateAll()}}updateGeometry({props:t,oldProps:e,changeFlags:n}){if(n.dataChanged||n.updateTriggersChanged&&(n.updateTriggersChanged.all||n.updateTriggersChanged.getPolygon)){const{polygonTesselator:s}=this.state,r=t.data.attributes||{};s.updateGeometry({data:t.data,normalize:t._normalize,geometryBuffer:r.getPolygon,buffers:r,getGeometry:t.getPolygon,positionFormat:t.positionFormat,wrapLongitude:t.wrapLongitude,resolution:this.context.viewport.resolution,fp64:this.use64bitPositions(),dataChanged:n.dataChanged,full3d:t._full3d}),this.setState({numInstances:s.instanceCount,startIndices:s.vertexStarts}),n.dataChanged||this.getAttributeManager().invalidateAll()}}_getModels(t){const{id:e,filled:n,extruded:o}=this.props;let s,r;if(n){const a=this.getShaders("top");a.defines.NON_INSTANCED_MODEL=1,s=new V(t,{...a,id:"".concat(e,"-top"),drawMode:4,attributes:{vertexPositions:new Float32Array([0,1])},uniforms:{isWireframe:!1,isSideVertex:!1},vertexCount:0,isIndexed:!0})}return o&&(r=new V(t,{...this.getShaders("side"),id:"".concat(e,"-side"),geometry:new Q({drawMode:1,vertexCount:4,attributes:{vertexPositions:{size:2,value:new Float32Array([1,0,0,0,0,1,1,1])}}}),instanceCount:0,isInstanced:1}),r.userData.excludeAttributes={indices:!0}),{models:[r,s].filter(Boolean),topModel:s,sideModel:r}}calculateIndices(t){const{polygonTesselator:e}=this.state;t.startIndices=e.indexStarts,t.value=e.get("indices")}calculatePositions(t){const{polygonTesselator:e}=this.state;t.startIndices=e.vertexStarts,t.value=e.get("positions")}calculateVertexValid(t){t.value=this.state.polygonTesselator.get("vertexValid")}}g(ae,"defaultProps",yo);g(ae,"layerName","SolidPolygonLayer");function xo({data:i,getIndex:t,dataRange:e,replace:n}){const{startRow:o=0,endRow:s=1/0}=e,r=i.length;let a=r,l=r;for(let h=0;h<r;h++){const f=t(i[h]);if(a>h&&f>=o&&(a=h),f>=s){l=h;break}}let c=a;const d=l-a!==n.length?i.slice(l):void 0;for(let h=0;h<n.length;h++)i[c++]=n[h];if(d){for(let h=0;h<d.length;h++)i[c++]=d[h];i.length=c}return{startRow:a,endRow:a+n.length}}function vo(i,t){if(!i)return null;const e="startIndices"in i?i.startIndices[t]:t,n=i.featureIds.value[e];return e!==-1?_o(i,n,e):null}function _o(i,t,e){const n={properties:{...i.properties[t]}};for(const o in i.numericProps)n.properties[o]=i.numericProps[o].value[e];return n}function Po(i,t){const e={points:null,lines:null,polygons:null};for(const n in e){const o=i[n].globalFeatureIds.value;e[n]=new Uint8ClampedArray(o.length*3);const s=[];for(let r=0;r<o.length;r++)t(o[r],s),e[n][r*3+0]=s[0],e[n][r*3+1]=s[1],e[n][r*3+2]=s[2]}return e}const Co=`#define SHADER_NAME multi-icon-layer-fragment-shader

precision highp float;

uniform float opacity;
uniform sampler2D iconsTexture;
uniform float gamma;
uniform bool sdf;
uniform float alphaCutoff;
uniform float sdfBuffer;
uniform float outlineBuffer;
uniform vec4 outlineColor;

varying vec4 vColor;
varying vec2 vTextureCoords;
varying vec2 uv;

void main(void) {
  geometry.uv = uv;

  if (!picking_uActive) {
    float alpha = texture2D(iconsTexture, vTextureCoords).a;
    vec4 color = vColor;
    if (sdf) {
      float distance = alpha;
      alpha = smoothstep(sdfBuffer - gamma, sdfBuffer + gamma, distance);

      if (outlineBuffer > 0.0) {
        float inFill = alpha;
        float inBorder = smoothstep(outlineBuffer - gamma, outlineBuffer + gamma, distance);
        color = mix(outlineColor, vColor, inFill);
        alpha = inBorder;
      }
    }
    float a = alpha * color.a;
    
    if (a < alphaCutoff) {
      discard;
    }

    gl_FragColor = vec4(color.rgb, a * opacity);
  }

  DECKGL_FILTER_COLOR(gl_FragColor, geometry);
}
`,Wt=192/256,Ne=[],Lo={getIconOffsets:{type:"accessor",value:i=>i.offsets},alphaCutoff:.001,smoothing:.1,outlineWidth:0,outlineColor:{type:"color",value:[0,0,0,255]}};class le extends Et{constructor(...t){super(...t),g(this,"state",void 0)}getShaders(){return{...super.getShaders(),fs:Co}}initializeState(){super.initializeState(),this.getAttributeManager().addInstanced({instanceOffsets:{size:2,accessor:"getIconOffsets"},instancePickingColors:{type:5121,size:3,accessor:(e,{index:n,target:o})=>this.encodePickingColor(n,o)}})}updateState(t){super.updateState(t);const{props:e,oldProps:n}=t;let{outlineColor:o}=e;o!==n.outlineColor&&(o=o.map(s=>s/255),o[3]=Number.isFinite(o[3])?o[3]:1,this.setState({outlineColor:o})),!e.sdf&&e.outlineWidth&&N.warn("".concat(this.id,": fontSettings.sdf is required to render outline"))()}draw(t){const{sdf:e,smoothing:n,outlineWidth:o}=this.props,{outlineColor:s}=this.state,r=o?Math.max(n,Wt*(1-o)):-1;if(t.uniforms={...t.uniforms,sdfBuffer:Wt,outlineBuffer:r,gamma:n,sdf:!!e,outlineColor:s},super.draw(t),e&&o){const{iconManager:a}=this.state;a.getTexture()&&this.state.model.draw({uniforms:{outlineBuffer:Wt}})}}getInstanceOffset(t){return t?Array.from(t).flatMap(e=>super.getInstanceOffset(e)):Ne}getInstanceColorMode(t){return 1}getInstanceIconFrame(t){return t?Array.from(t).flatMap(e=>super.getInstanceIconFrame(e)):Ne}}g(le,"defaultProps",Lo);g(le,"layerName","MultiIconLayer");const ot=1e20;class So{constructor({fontSize:t=24,buffer:e=3,radius:n=8,cutoff:o=.25,fontFamily:s="sans-serif",fontWeight:r="normal",fontStyle:a="normal"}={}){this.buffer=e,this.cutoff=o,this.radius=n;const l=this.size=t+e*4,c=this._createCanvas(l),u=this.ctx=c.getContext("2d",{willReadFrequently:!0});u.font=`${a} ${r} ${t}px ${s}`,u.textBaseline="alphabetic",u.textAlign="left",u.fillStyle="black",this.gridOuter=new Float64Array(l*l),this.gridInner=new Float64Array(l*l),this.f=new Float64Array(l),this.z=new Float64Array(l+1),this.v=new Uint16Array(l)}_createCanvas(t){const e=document.createElement("canvas");return e.width=e.height=t,e}draw(t){const{width:e,actualBoundingBoxAscent:n,actualBoundingBoxDescent:o,actualBoundingBoxLeft:s,actualBoundingBoxRight:r}=this.ctx.measureText(t),a=Math.ceil(n),l=0,c=Math.max(0,Math.min(this.size-this.buffer,Math.ceil(r-s))),u=Math.min(this.size-this.buffer,a+Math.ceil(o)),d=c+2*this.buffer,h=u+2*this.buffer,f=Math.max(d*h,0),p=new Uint8ClampedArray(f),m={data:p,width:d,height:h,glyphWidth:c,glyphHeight:u,glyphTop:a,glyphLeft:l,glyphAdvance:e};if(c===0||u===0)return m;const{ctx:y,buffer:_,gridInner:C,gridOuter:v}=this;y.clearRect(_,_,c,u),y.fillText(t,_,_+a);const P=y.getImageData(_,_,c,u);v.fill(ot,0,f),C.fill(0,0,f);for(let L=0;L<u;L++)for(let b=0;b<c;b++){const M=P.data[4*(L*c+b)+3]/255;if(M===0)continue;const z=(L+_)*d+b+_;if(M===1)v[z]=0,C[z]=ot;else{const w=.5-M;v[z]=w>0?w*w:0,C[z]=w<0?w*w:0}}De(v,0,0,d,h,d,this.f,this.v,this.z),De(C,_,_,c,u,d,this.f,this.v,this.z);for(let L=0;L<f;L++){const b=Math.sqrt(v[L])-Math.sqrt(C[L]);p[L]=Math.round(255-255*(b/this.radius+this.cutoff))}return m}}function De(i,t,e,n,o,s,r,a,l){for(let c=t;c<t+n;c++)Be(i,e*s+c,s,o,r,a,l);for(let c=e;c<e+o;c++)Be(i,c*s+t,1,n,r,a,l)}function Be(i,t,e,n,o,s,r){s[0]=0,r[0]=-ot,r[1]=ot,o[0]=i[t];for(let a=1,l=0,c=0;a<n;a++){o[a]=i[t+a*e];const u=a*a;do{const d=s[l];c=(o[a]-o[d]+u-d*d)/(a-d)/2}while(c<=r[l]&&--l>-1);l++,s[l]=a,r[l]=c,r[l+1]=ot}for(let a=0,l=0;a<n;a++){for(;r[l+1]<a;)l++;const c=s[l],u=a-c;i[t+a*e]=o[c]+u*u}}const bo=32,To=[];function wo(i){return Math.pow(2,Math.ceil(Math.log2(i)))}function Io({characterSet:i,getFontWidth:t,fontHeight:e,buffer:n,maxCanvasWidth:o,mapping:s={},xOffset:r=0,yOffset:a=0}){let l=0,c=r;const u=e+n*2;for(const d of i)if(!s[d]){const h=t(d);c+h+n*2>o&&(c=0,l++),s[d]={x:c+n,y:a+l*u+n,width:h,height:u,layoutWidth:h,layoutHeight:e},c+=h+n*2}return{mapping:s,xOffset:c,yOffset:a+l*u,canvasHeight:wo(a+(l+1)*u)}}function Ln(i,t,e,n){let o=0;for(let r=t;r<e;r++){var s;const a=i[r];o+=((s=n[a])===null||s===void 0?void 0:s.layoutWidth)||0}return o}function Sn(i,t,e,n,o,s){let r=t,a=0;for(let l=t;l<e;l++){const c=Ln(i,l,l+1,o);a+c>n&&(r<l&&s.push(l),r=l,a=0),a+=c}return a}function Mo(i,t,e,n,o,s){let r=t,a=t,l=t,c=0;for(let u=t;u<e;u++)if((i[u]===" "||i[u+1]===" "||u+1===e)&&(l=u+1),l>a){let d=Ln(i,a,l,o);c+d>n&&(r<a&&(s.push(a),r=a,c=0),d>n&&(d=Sn(i,a,l,n,o,s),r=s[s.length-1])),a=l,c+=d}return c}function Ao(i,t,e,n,o=0,s){s===void 0&&(s=i.length);const r=[];return t==="break-all"?Sn(i,o,s,e,n,r):Mo(i,o,s,e,n,r),r}function Eo(i,t,e,n,o,s){let r=0,a=0;for(let l=t;l<e;l++){const c=i[l],u=n[c];u?(a||(a=u.layoutHeight),o[l]=r+u.layoutWidth/2,r+=u.layoutWidth):(N.warn("Missing character: ".concat(c," (").concat(c.codePointAt(0),")"))(),o[l]=r,r+=bo)}s[0]=r,s[1]=a}function Oo(i,t,e,n,o){const s=Array.from(i),r=s.length,a=new Array(r),l=new Array(r),c=new Array(r),u=(e==="break-word"||e==="break-all")&&isFinite(n)&&n>0,d=[0,0],h=[0,0];let f=0,p=0,m=0;for(let _=0;_<=r;_++){const C=s[_];if((C===`
`||_===r)&&(m=_),m>p){const v=u?Ao(s,e,n,o,p,m):To;for(let P=0;P<=v.length;P++){const L=P===0?p:v[P-1],b=P<v.length?v[P]:m;Eo(s,L,b,o,a,h);for(let M=L;M<b;M++){var y;const z=s[M],w=((y=o[z])===null||y===void 0?void 0:y.layoutOffsetY)||0;l[M]=f+h[1]/2+w,c[M]=h[0]}f=f+h[1]*t,d[0]=Math.max(d[0],h[0])}p=m}C===`
`&&(a[p]=0,l[p]=0,c[p]=0,p++)}return d[1]=f,{x:a,y:l,rowWidth:c,size:d}}function zo({value:i,length:t,stride:e,offset:n,startIndices:o,characterSet:s}){const r=i.BYTES_PER_ELEMENT,a=e?e/r:1,l=n?n/r:0,c=o[t]||Math.ceil((i.length-l)/a),u=s&&new Set,d=new Array(t);let h=i;if(a>1||l>0){const f=i.constructor;h=new f(c);for(let p=0;p<c;p++)h[p]=i[p*a+l]}for(let f=0;f<t;f++){const p=o[f],m=o[f+1]||c,y=h.subarray(p,m);d[f]=String.fromCodePoint.apply(null,y),u&&y.forEach(u.add,u)}if(u)for(const f of u)s.add(String.fromCodePoint(f));return{texts:d,characterCount:c}}class bn{constructor(t=5){g(this,"limit",void 0),g(this,"_cache",{}),g(this,"_order",[]),this.limit=t}get(t){const e=this._cache[t];return e&&(this._deleteOrder(t),this._appendOrder(t)),e}set(t,e){this._cache[t]?(this.delete(t),this._cache[t]=e,this._appendOrder(t)):(Object.keys(this._cache).length===this.limit&&this.delete(this._order[0]),this._cache[t]=e,this._appendOrder(t))}delete(t){this._cache[t]&&(delete this._cache[t],this._deleteOrder(t))}_deleteOrder(t){const e=this._order.indexOf(t);e>=0&&this._order.splice(e,1)}_appendOrder(t){this._order.push(t)}}function Ro(){const i=[];for(let t=32;t<128;t++)i.push(String.fromCharCode(t));return i}const K={fontFamily:"Monaco, monospace",fontWeight:"normal",characterSet:Ro(),fontSize:64,buffer:4,sdf:!1,cutoff:.25,radius:12,smoothing:.1},ke=1024,Ue=.9,We=1.2,Tn=3;let Mt=new bn(Tn);function Fo(i,t){let e;typeof t=="string"?e=new Set(Array.from(t)):e=new Set(t);const n=Mt.get(i);if(!n)return e;for(const o in n.mapping)e.has(o)&&e.delete(o);return e}function No(i,t){for(let e=0;e<i.length;e++)t.data[4*e+3]=i[e]}function Ge(i,t,e,n){i.font="".concat(n," ").concat(e,"px ").concat(t),i.fillStyle="#000",i.textBaseline="alphabetic",i.textAlign="left"}function Do(i){N.assert(Number.isFinite(i)&&i>=Tn,"Invalid cache limit"),Mt=new bn(i)}class Bo{constructor(){g(this,"props",{...K}),g(this,"_key",void 0),g(this,"_atlas",void 0)}get texture(){return this._atlas}get mapping(){return this._atlas&&this._atlas.mapping}get scale(){const{fontSize:t,buffer:e}=this.props;return(t*We+e*2)/t}setProps(t={}){Object.assign(this.props,t),this._key=this._getKey();const e=Fo(this._key,this.props.characterSet),n=Mt.get(this._key);if(n&&e.size===0){this._atlas!==n&&(this._atlas=n);return}const o=this._generateFontAtlas(e,n);this._atlas=o,Mt.set(this._key,o)}_generateFontAtlas(t,e){const{fontFamily:n,fontWeight:o,fontSize:s,buffer:r,sdf:a,radius:l,cutoff:c}=this.props;let u=e&&e.data;u||(u=document.createElement("canvas"),u.width=ke);const d=u.getContext("2d",{willReadFrequently:!0});Ge(d,n,s,o);const{mapping:h,canvasHeight:f,xOffset:p,yOffset:m}=Io({getFontWidth:y=>d.measureText(y).width,fontHeight:s*We,buffer:r,characterSet:t,maxCanvasWidth:ke,...e&&{mapping:e.mapping,xOffset:e.xOffset,yOffset:e.yOffset}});if(u.height!==f){const y=d.getImageData(0,0,u.width,u.height);u.height=f,d.putImageData(y,0,0)}if(Ge(d,n,s,o),a){const y=new So({fontSize:s,buffer:r,radius:l,cutoff:c,fontFamily:n,fontWeight:"".concat(o)});for(const _ of t){const{data:C,width:v,height:P,glyphTop:L}=y.draw(_);h[_].width=v,h[_].layoutOffsetY=s*Ue-L;const b=d.createImageData(v,P);No(C,b),d.putImageData(b,h[_].x,h[_].y)}}else for(const y of t)d.fillText(y,h[y].x,h[y].y+r+s*Ue);return{xOffset:p,yOffset:m,mapping:h,data:u,width:u.width,height:u.height}}_getKey(){const{fontFamily:t,fontWeight:e,fontSize:n,buffer:o,sdf:s,radius:r,cutoff:a}=this.props;return s?"".concat(t," ").concat(e," ").concat(n," ").concat(o," ").concat(r," ").concat(a):"".concat(t," ").concat(e," ").concat(n," ").concat(o)}}const ko=`#define SHADER_NAME text-background-layer-vertex-shader

attribute vec2 positions;

attribute vec3 instancePositions;
attribute vec3 instancePositions64Low;
attribute vec4 instanceRects;
attribute float instanceSizes;
attribute float instanceAngles;
attribute vec2 instancePixelOffsets;
attribute float instanceLineWidths;
attribute vec4 instanceFillColors;
attribute vec4 instanceLineColors;
attribute vec3 instancePickingColors;

uniform bool billboard;
uniform float opacity;
uniform float sizeScale;
uniform float sizeMinPixels;
uniform float sizeMaxPixels;
uniform vec4 padding;
uniform int sizeUnits;

varying vec4 vFillColor;
varying vec4 vLineColor;
varying float vLineWidth;
varying vec2 uv;
varying vec2 dimensions;

vec2 rotate_by_angle(vec2 vertex, float angle) {
  float angle_radian = radians(angle);
  float cos_angle = cos(angle_radian);
  float sin_angle = sin(angle_radian);
  mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
  return rotationMatrix * vertex;
}

void main(void) {
  geometry.worldPosition = instancePositions;
  geometry.uv = positions;
  geometry.pickingColor = instancePickingColors;
  uv = positions;
  vLineWidth = instanceLineWidths;
  float sizePixels = clamp(
    project_size_to_pixel(instanceSizes * sizeScale, sizeUnits),
    sizeMinPixels, sizeMaxPixels
  );

  dimensions = instanceRects.zw * sizePixels + padding.xy + padding.zw;

  vec2 pixelOffset = (positions * instanceRects.zw + instanceRects.xy) * sizePixels + mix(-padding.xy, padding.zw, positions);
  pixelOffset = rotate_by_angle(pixelOffset, instanceAngles);
  pixelOffset += instancePixelOffsets;
  pixelOffset.y *= -1.0;

  if (billboard)  {
    gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
    DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
    vec3 offset = vec3(pixelOffset, 0.0);
    DECKGL_FILTER_SIZE(offset, geometry);
    gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
  } else {
    vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
    DECKGL_FILTER_SIZE(offset_common, geometry);
    gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position);
    DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
  }
  vFillColor = vec4(instanceFillColors.rgb, instanceFillColors.a * opacity);
  DECKGL_FILTER_COLOR(vFillColor, geometry);
  vLineColor = vec4(instanceLineColors.rgb, instanceLineColors.a * opacity);
  DECKGL_FILTER_COLOR(vLineColor, geometry);
}
`,Uo=`#define SHADER_NAME text-background-layer-fragment-shader

precision highp float;

uniform bool stroked;

varying vec4 vFillColor;
varying vec4 vLineColor;
varying float vLineWidth;
varying vec2 uv;
varying vec2 dimensions;

void main(void) {
  geometry.uv = uv;

  vec2 pixelPosition = uv * dimensions;
  if (stroked) {
    float distToEdge = min(
      min(pixelPosition.x, dimensions.x - pixelPosition.x),
      min(pixelPosition.y, dimensions.y - pixelPosition.y)
    );
    float isBorder = smoothedge(distToEdge, vLineWidth);
    gl_FragColor = mix(vFillColor, vLineColor, isBorder);
  } else {
    gl_FragColor = vFillColor;
  }

  DECKGL_FILTER_COLOR(gl_FragColor, geometry);
}
`,Wo={billboard:!0,sizeScale:1,sizeUnits:"pixels",sizeMinPixels:0,sizeMaxPixels:Number.MAX_SAFE_INTEGER,padding:{type:"array",value:[0,0,0,0]},getPosition:{type:"accessor",value:i=>i.position},getSize:{type:"accessor",value:1},getAngle:{type:"accessor",value:0},getPixelOffset:{type:"accessor",value:[0,0]},getBoundingRect:{type:"accessor",value:[0,0,0,0]},getFillColor:{type:"accessor",value:[0,0,0,255]},getLineColor:{type:"accessor",value:[0,0,0,255]},getLineWidth:{type:"accessor",value:1}};class ce extends Y{constructor(...t){super(...t),g(this,"state",void 0)}getShaders(){return super.getShaders({vs:ko,fs:Uo,modules:[J,$]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:5130,fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceSizes:{size:1,transition:!0,accessor:"getSize",defaultValue:1},instanceAngles:{size:1,transition:!0,accessor:"getAngle"},instanceRects:{size:4,accessor:"getBoundingRect"},instancePixelOffsets:{size:2,transition:!0,accessor:"getPixelOffset"},instanceFillColors:{size:4,transition:!0,normalized:!0,type:5121,accessor:"getFillColor",defaultValue:[0,0,0,255]},instanceLineColors:{size:4,transition:!0,normalized:!0,type:5121,accessor:"getLineColor",defaultValue:[0,0,0,255]},instanceLineWidths:{size:1,transition:!0,accessor:"getLineWidth",defaultValue:1}})}updateState(t){super.updateState(t);const{changeFlags:e}=t;if(e.extensionsChanged){var n;const{gl:o}=this.context;(n=this.state.model)===null||n===void 0||n.delete(),this.state.model=this._getModel(o),this.getAttributeManager().invalidateAll()}}draw({uniforms:t}){const{billboard:e,sizeScale:n,sizeUnits:o,sizeMinPixels:s,sizeMaxPixels:r,getLineWidth:a}=this.props;let{padding:l}=this.props;l.length<4&&(l=[l[0],l[1],l[0],l[1]]),this.state.model.setUniforms(t).setUniforms({billboard:e,stroked:!!a,padding:l,sizeUnits:st[o],sizeScale:n,sizeMinPixels:s,sizeMaxPixels:r}).draw()}_getModel(t){const e=[0,0,1,0,1,1,0,1];return new V(t,{...this.getShaders(),id:this.props.id,geometry:new Q({drawMode:6,vertexCount:4,attributes:{positions:{size:2,value:new Float32Array(e)}}}),isInstanced:!0})}}g(ce,"defaultProps",Wo);g(ce,"layerName","TextBackgroundLayer");const Ve={start:1,middle:0,end:-1},je={top:1,center:0,bottom:-1},Gt=[0,0,0,255],Go=1,Vo={billboard:!0,sizeScale:1,sizeUnits:"pixels",sizeMinPixels:0,sizeMaxPixels:Number.MAX_SAFE_INTEGER,background:!1,getBackgroundColor:{type:"accessor",value:[255,255,255,255]},getBorderColor:{type:"accessor",value:Gt},getBorderWidth:{type:"accessor",value:0},backgroundPadding:{type:"array",value:[0,0,0,0]},characterSet:{type:"object",value:K.characterSet},fontFamily:K.fontFamily,fontWeight:K.fontWeight,lineHeight:Go,outlineWidth:{type:"number",value:0,min:0},outlineColor:{type:"color",value:Gt},fontSettings:{type:"object",value:{},compare:1},wordBreak:"break-word",maxWidth:{type:"number",value:-1},getText:{type:"accessor",value:i=>i.text},getPosition:{type:"accessor",value:i=>i.position},getColor:{type:"accessor",value:Gt},getSize:{type:"accessor",value:32},getAngle:{type:"accessor",value:0},getTextAnchor:{type:"accessor",value:"middle"},getAlignmentBaseline:{type:"accessor",value:"center"},getPixelOffset:{type:"accessor",value:[0,0]},backgroundColor:{deprecatedFor:["background","getBackgroundColor"]}};class ue extends ne{constructor(...t){super(...t),g(this,"state",void 0),g(this,"getBoundingRect",(e,n)=>{let{size:[o,s]}=this.transformParagraph(e,n);const{fontSize:r}=this.state.fontAtlasManager.props;o/=r,s/=r;const{getTextAnchor:a,getAlignmentBaseline:l}=this.props,c=Ve[typeof a=="function"?a(e,n):a],u=je[typeof l=="function"?l(e,n):l];return[(c-1)*o/2,(u-1)*s/2,o,s]}),g(this,"getIconOffsets",(e,n)=>{const{getTextAnchor:o,getAlignmentBaseline:s}=this.props,{x:r,y:a,rowWidth:l,size:[c,u]}=this.transformParagraph(e,n),d=Ve[typeof o=="function"?o(e,n):o],h=je[typeof s=="function"?s(e,n):s],f=r.length,p=new Array(f*2);let m=0;for(let y=0;y<f;y++){const _=(1-d)*(c-l[y])/2;p[m++]=(d-1)*c/2+_+r[y],p[m++]=(h-1)*u/2+a[y]}return p})}initializeState(){this.state={styleVersion:0,fontAtlasManager:new Bo},this.props.maxWidth>0&&N.warn("v8.9 breaking change: TextLayer maxWidth is now relative to text size")()}updateState(t){const{props:e,oldProps:n,changeFlags:o}=t;(o.dataChanged||o.updateTriggersChanged&&(o.updateTriggersChanged.all||o.updateTriggersChanged.getText))&&this._updateText(),(this._updateFontAtlas()||e.lineHeight!==n.lineHeight||e.wordBreak!==n.wordBreak||e.maxWidth!==n.maxWidth)&&this.setState({styleVersion:this.state.styleVersion+1})}getPickingInfo({info:t}){return t.object=t.index>=0?this.props.data[t.index]:null,t}_updateFontAtlas(){const{fontSettings:t,fontFamily:e,fontWeight:n}=this.props,{fontAtlasManager:o,characterSet:s}=this.state,r={...t,characterSet:s,fontFamily:e,fontWeight:n};if(!o.mapping)return o.setProps(r),!0;for(const a in r)if(r[a]!==o.props[a])return o.setProps(r),!0;return!1}_updateText(){var t;const{data:e,characterSet:n}=this.props,o=(t=e.attributes)===null||t===void 0?void 0:t.getText;let{getText:s}=this.props,r=e.startIndices,a;const l=n==="auto"&&new Set;if(o&&r){const{texts:c,characterCount:u}=zo({...ArrayBuffer.isView(o)?{value:o}:o,length:e.length,startIndices:r,characterSet:l});a=u,s=(d,{index:h})=>c[h]}else{const{iterable:c,objectInfo:u}=sn(e);r=[0],a=0;for(const d of c){u.index++;const h=Array.from(s(d,u)||"");l&&h.forEach(l.add,l),a+=h.length,r.push(a)}}this.setState({getText:s,startIndices:r,numInstances:a,characterSet:l||n})}transformParagraph(t,e){const{fontAtlasManager:n}=this.state,o=n.mapping,s=this.state.getText,{wordBreak:r,lineHeight:a,maxWidth:l}=this.props,c=s(t,e)||"";return Oo(c,a,r,l*n.props.fontSize,o)}renderLayers(){const{startIndices:t,numInstances:e,getText:n,fontAtlasManager:{scale:o,texture:s,mapping:r},styleVersion:a}=this.state,{data:l,_dataDiff:c,getPosition:u,getColor:d,getSize:h,getAngle:f,getPixelOffset:p,getBackgroundColor:m,getBorderColor:y,getBorderWidth:_,backgroundPadding:C,background:v,billboard:P,fontSettings:L,outlineWidth:b,outlineColor:M,sizeScale:z,sizeUnits:w,sizeMinPixels:A,sizeMaxPixels:xe,transitions:O,updateTriggers:T}=this.props,On=this.getSubLayerClass("characters",le),zn=this.getSubLayerClass("background",ce);return[v&&new zn({getFillColor:m,getLineColor:y,getLineWidth:_,padding:C,getPosition:u,getSize:h,getAngle:f,getPixelOffset:p,billboard:P,sizeScale:z,sizeUnits:w,sizeMinPixels:A,sizeMaxPixels:xe,transitions:O&&{getPosition:O.getPosition,getAngle:O.getAngle,getSize:O.getSize,getFillColor:O.getBackgroundColor,getLineColor:O.getBorderColor,getLineWidth:O.getBorderWidth,getPixelOffset:O.getPixelOffset}},this.getSubLayerProps({id:"background",updateTriggers:{getPosition:T.getPosition,getAngle:T.getAngle,getSize:T.getSize,getFillColor:T.getBackgroundColor,getLineColor:T.getBorderColor,getLineWidth:T.getBorderWidth,getPixelOffset:T.getPixelOffset,getBoundingRect:{getText:T.getText,getTextAnchor:T.getTextAnchor,getAlignmentBaseline:T.getAlignmentBaseline,styleVersion:a}}}),{data:l.attributes&&l.attributes.background?{length:l.length,attributes:l.attributes.background}:l,_dataDiff:c,autoHighlight:!1,getBoundingRect:this.getBoundingRect}),new On({sdf:L.sdf,smoothing:Number.isFinite(L.smoothing)?L.smoothing:K.smoothing,outlineWidth:b/(L.radius||K.radius),outlineColor:M,iconAtlas:s,iconMapping:r,getPosition:u,getColor:d,getSize:h,getAngle:f,getPixelOffset:p,billboard:P,sizeScale:z*o,sizeUnits:w,sizeMinPixels:A*o,sizeMaxPixels:xe*o,transitions:O&&{getPosition:O.getPosition,getAngle:O.getAngle,getColor:O.getColor,getSize:O.getSize,getPixelOffset:O.getPixelOffset}},this.getSubLayerProps({id:"characters",updateTriggers:{all:T.getText,getPosition:T.getPosition,getAngle:T.getAngle,getColor:T.getColor,getSize:T.getSize,getPixelOffset:T.getPixelOffset,getIconOffsets:{getTextAnchor:T.getTextAnchor,getAlignmentBaseline:T.getAlignmentBaseline,styleVersion:a}}}),{data:l,_dataDiff:c,startIndices:t,numInstances:e,getIconOffsets:this.getIconOffsets,getIcon:n})]}static set fontAtlasCacheLimit(t){Do(t)}}g(ue,"defaultProps",Vo);g(ue,"layerName","TextLayer");const bt={circle:{type:oe,props:{filled:"filled",stroked:"stroked",lineWidthMaxPixels:"lineWidthMaxPixels",lineWidthMinPixels:"lineWidthMinPixels",lineWidthScale:"lineWidthScale",lineWidthUnits:"lineWidthUnits",pointRadiusMaxPixels:"radiusMaxPixels",pointRadiusMinPixels:"radiusMinPixels",pointRadiusScale:"radiusScale",pointRadiusUnits:"radiusUnits",pointAntialiasing:"antialiasing",pointBillboard:"billboard",getFillColor:"getFillColor",getLineColor:"getLineColor",getLineWidth:"getLineWidth",getPointRadius:"getRadius"}},icon:{type:Et,props:{iconAtlas:"iconAtlas",iconMapping:"iconMapping",iconSizeMaxPixels:"sizeMaxPixels",iconSizeMinPixels:"sizeMinPixels",iconSizeScale:"sizeScale",iconSizeUnits:"sizeUnits",iconAlphaCutoff:"alphaCutoff",iconBillboard:"billboard",getIcon:"getIcon",getIconAngle:"getAngle",getIconColor:"getColor",getIconPixelOffset:"getPixelOffset",getIconSize:"getSize"}},text:{type:ue,props:{textSizeMaxPixels:"sizeMaxPixels",textSizeMinPixels:"sizeMinPixels",textSizeScale:"sizeScale",textSizeUnits:"sizeUnits",textBackground:"background",textBackgroundPadding:"backgroundPadding",textFontFamily:"fontFamily",textFontWeight:"fontWeight",textLineHeight:"lineHeight",textMaxWidth:"maxWidth",textOutlineColor:"outlineColor",textOutlineWidth:"outlineWidth",textWordBreak:"wordBreak",textCharacterSet:"characterSet",textBillboard:"billboard",textFontSettings:"fontSettings",getText:"getText",getTextAngle:"getAngle",getTextColor:"getColor",getTextPixelOffset:"getPixelOffset",getTextSize:"getSize",getTextAnchor:"getTextAnchor",getTextAlignmentBaseline:"getAlignmentBaseline",getTextBackgroundColor:"getBackgroundColor",getTextBorderColor:"getBorderColor",getTextBorderWidth:"getBorderWidth"}}},Tt={type:se,props:{lineWidthUnits:"widthUnits",lineWidthScale:"widthScale",lineWidthMinPixels:"widthMinPixels",lineWidthMaxPixels:"widthMaxPixels",lineJointRounded:"jointRounded",lineCapRounded:"capRounded",lineMiterLimit:"miterLimit",lineBillboard:"billboard",getLineColor:"getColor",getLineWidth:"getWidth"}},Jt={type:ae,props:{extruded:"extruded",filled:"filled",wireframe:"wireframe",elevationScale:"elevationScale",material:"material",_full3d:"_full3d",getElevation:"getElevation",getFillColor:"getFillColor",getLineColor:"getLineColor"}};function tt({type:i,props:t}){const e={};for(const n in t)e[n]=i.defaultProps[t[n]];return e}function Vt(i,t){const{transitions:e,updateTriggers:n}=i.props,o={updateTriggers:{},transitions:e&&{getPosition:e.geometry}};for(const s in t){const r=t[s];let a=i.props[s];s.startsWith("get")&&(a=i.getSubLayerAccessor(a),o.updateTriggers[r]=n[s],e&&(o.transitions[r]=e[s])),o[r]=a}return o}function jo(i){if(Array.isArray(i))return i;switch(N.assert(i.type,"GeoJSON does not have type"),i.type){case"Feature":return[i];case"FeatureCollection":return N.assert(Array.isArray(i.features),"GeoJSON does not have features array"),i.features;default:return[{geometry:i}]}}function He(i,t,e={}){const n={pointFeatures:[],lineFeatures:[],polygonFeatures:[],polygonOutlineFeatures:[]},{startRow:o=0,endRow:s=i.length}=e;for(let r=o;r<s;r++){const a=i[r],{geometry:l}=a;if(l)if(l.type==="GeometryCollection"){N.assert(Array.isArray(l.geometries),"GeoJSON does not have geometries array");const{geometries:c}=l;for(let u=0;u<c.length;u++){const d=c[u];Ze(d,n,t,a,r)}}else Ze(l,n,t,a,r)}return n}function Ze(i,t,e,n,o){const{type:s,coordinates:r}=i,{pointFeatures:a,lineFeatures:l,polygonFeatures:c,polygonOutlineFeatures:u}=t;if(!Zo(s,r)){N.warn("".concat(s," coordinates are malformed"))();return}switch(s){case"Point":a.push(e({geometry:i},n,o));break;case"MultiPoint":r.forEach(d=>{a.push(e({geometry:{type:"Point",coordinates:d}},n,o))});break;case"LineString":l.push(e({geometry:i},n,o));break;case"MultiLineString":r.forEach(d=>{l.push(e({geometry:{type:"LineString",coordinates:d}},n,o))});break;case"Polygon":c.push(e({geometry:i},n,o)),r.forEach(d=>{u.push(e({geometry:{type:"LineString",coordinates:d}},n,o))});break;case"MultiPolygon":r.forEach(d=>{c.push(e({geometry:{type:"Polygon",coordinates:d}},n,o)),d.forEach(h=>{u.push(e({geometry:{type:"LineString",coordinates:h}},n,o))})});break}}const Ho={Point:1,MultiPoint:2,LineString:2,MultiLineString:3,Polygon:3,MultiPolygon:4};function Zo(i,t){let e=Ho[i];for(N.assert(e,"Unknown GeoJSON type ".concat(i));t&&--e>0;)t=t[0];return t&&Number.isFinite(t[0])}function wn(){return{points:{},lines:{},polygons:{},polygonsOutline:{}}}function mt(i){return i.geometry.coordinates}function qo(i,t){const e=wn(),{pointFeatures:n,lineFeatures:o,polygonFeatures:s,polygonOutlineFeatures:r}=i;return e.points.data=n,e.points._dataDiff=t.pointFeatures&&(()=>t.pointFeatures),e.points.getPosition=mt,e.lines.data=o,e.lines._dataDiff=t.lineFeatures&&(()=>t.lineFeatures),e.lines.getPath=mt,e.polygons.data=s,e.polygons._dataDiff=t.polygonFeatures&&(()=>t.polygonFeatures),e.polygons.getPolygon=mt,e.polygonsOutline.data=r,e.polygonsOutline._dataDiff=t.polygonOutlineFeatures&&(()=>t.polygonOutlineFeatures),e.polygonsOutline.getPath=mt,e}function Ko(i,t){const e=wn(),{points:n,lines:o,polygons:s}=i,r=Po(i,t);return e.points.data={length:n.positions.value.length/n.positions.size,attributes:{...n.attributes,getPosition:n.positions,instancePickingColors:{size:3,value:r.points}},properties:n.properties,numericProps:n.numericProps,featureIds:n.featureIds},e.lines.data={length:o.pathIndices.value.length-1,startIndices:o.pathIndices.value,attributes:{...o.attributes,getPath:o.positions,instancePickingColors:{size:3,value:r.lines}},properties:o.properties,numericProps:o.numericProps,featureIds:o.featureIds},e.lines._pathType="open",e.polygons.data={length:s.polygonIndices.value.length-1,startIndices:s.polygonIndices.value,attributes:{...s.attributes,getPolygon:s.positions,pickingColors:{size:3,value:r.polygons}},properties:s.properties,numericProps:s.numericProps,featureIds:s.featureIds},e.polygons._normalize=!1,s.triangles&&(e.polygons.data.attributes.indices=s.triangles.value),e.polygonsOutline.data={length:s.primitivePolygonIndices.value.length-1,startIndices:s.primitivePolygonIndices.value,attributes:{...s.attributes,getPath:s.positions,instancePickingColors:{size:3,value:r.polygons}},properties:s.properties,numericProps:s.numericProps,featureIds:s.featureIds},e.polygonsOutline._pathType="open",e}const Xo=["points","linestrings","polygons"],Yo={...tt(bt.circle),...tt(bt.icon),...tt(bt.text),...tt(Tt),...tt(Jt),stroked:!0,filled:!0,extruded:!1,wireframe:!1,_full3d:!1,iconAtlas:{type:"object",value:null},iconMapping:{type:"object",value:{}},getIcon:{type:"accessor",value:i=>i.properties.icon},getText:{type:"accessor",value:i=>i.properties.text},pointType:"circle",getRadius:{deprecatedFor:"getPointRadius"}};class Rt extends ne{initializeState(){this.state={layerProps:{},features:{}}}updateState({props:t,changeFlags:e}){if(!e.dataChanged)return;const{data:n}=this.props,o=n&&"points"in n&&"polygons"in n&&"lines"in n;this.setState({binary:o}),o?this._updateStateBinary({props:t,changeFlags:e}):this._updateStateJSON({props:t,changeFlags:e})}_updateStateBinary({props:t,changeFlags:e}){const n=Ko(t.data,this.encodePickingColor);this.setState({layerProps:n})}_updateStateJSON({props:t,changeFlags:e}){const n=jo(t.data),o=this.getSubLayerRow.bind(this);let s={};const r={};if(Array.isArray(e.dataChanged)){const l=this.state.features;for(const c in l)s[c]=l[c].slice(),r[c]=[];for(const c of e.dataChanged){const u=He(n,o,c);for(const d in l)r[d].push(xo({data:s[d],getIndex:h=>h.__source.index,dataRange:c,replace:u[d]}))}}else s=He(n,o);const a=qo(s,r);this.setState({features:s,featuresDiff:r,layerProps:a})}getPickingInfo(t){const e=super.getPickingInfo(t),{index:n,sourceLayer:o}=e;return e.featureType=Xo.find(s=>o.id.startsWith("".concat(this.id,"-").concat(s,"-"))),n>=0&&o.id.startsWith("".concat(this.id,"-points-text"))&&this.state.binary&&(e.index=this.props.data.points.globalFeatureIds.value[n]),e}_updateAutoHighlight(t){const e="".concat(this.id,"-points-"),n=t.featureType==="points";for(const o of this.getSubLayers())o.id.startsWith(e)===n&&o.updateAutoHighlight(t)}_renderPolygonLayer(){const{extruded:t,wireframe:e}=this.props,{layerProps:n}=this.state,o="polygons-fill",s=this.shouldRenderSubLayer(o,n.polygons.data)&&this.getSubLayerClass(o,Jt.type);if(s){const r=Vt(this,Jt.props),a=t&&e;return a||delete r.getLineColor,r.updateTriggers.lineColors=a,new s(r,this.getSubLayerProps({id:o,updateTriggers:r.updateTriggers}),n.polygons)}return null}_renderLineLayers(){const{extruded:t,stroked:e}=this.props,{layerProps:n}=this.state,o="polygons-stroke",s="linestrings",r=!t&&e&&this.shouldRenderSubLayer(o,n.polygonsOutline.data)&&this.getSubLayerClass(o,Tt.type),a=this.shouldRenderSubLayer(s,n.lines.data)&&this.getSubLayerClass(s,Tt.type);if(r||a){const l=Vt(this,Tt.props);return[r&&new r(l,this.getSubLayerProps({id:o,updateTriggers:l.updateTriggers}),n.polygonsOutline),a&&new a(l,this.getSubLayerProps({id:s,updateTriggers:l.updateTriggers}),n.lines)]}return null}_renderPointLayers(){const{pointType:t}=this.props,{layerProps:e,binary:n}=this.state;let{highlightedObjectIndex:o}=this.props;!n&&Number.isFinite(o)&&(o=e.points.data.findIndex(a=>a.__source.index===o));const s=new Set(t.split("+")),r=[];for(const a of s){const l="points-".concat(a),c=bt[a],u=c&&this.shouldRenderSubLayer(l,e.points.data)&&this.getSubLayerClass(l,c.type);if(u){const d=Vt(this,c.props);let h=e.points;if(a==="text"&&n){const{instancePickingColors:f,...p}=h.data.attributes;h={...h,data:{...h.data,attributes:p}}}r.push(new u(d,this.getSubLayerProps({id:l,updateTriggers:d.updateTriggers,highlightedObjectIndex:o}),h))}}return r}renderLayers(){const{extruded:t}=this.props,e=this._renderPolygonLayer(),n=this._renderLineLayers(),o=this._renderPointLayers();return[!t&&e,n,o,t&&e]}getSubLayerAccessor(t){const{binary:e}=this.state;return!e||typeof t!="function"?super.getSubLayerAccessor(t):(n,o)=>{const{data:s,index:r}=o,a=vo(s,r);return t(a,o)}}}g(Rt,"layerName","GeoJsonLayer");g(Rt,"defaultProps",Yo);class Jo{constructor(t){g(this,"index",void 0),g(this,"isVisible",void 0),g(this,"isSelected",void 0),g(this,"parent",void 0),g(this,"children",void 0),g(this,"content",void 0),g(this,"state",void 0),g(this,"layers",void 0),g(this,"id",void 0),g(this,"zoom",void 0),g(this,"userData",void 0),g(this,"boundingBox",void 0),g(this,"_abortController",void 0),g(this,"_loader",void 0),g(this,"_loaderId",void 0),g(this,"_isLoaded",void 0),g(this,"_isCancelled",void 0),g(this,"_needsReload",void 0),g(this,"_bbox",void 0),this.index=t,this.isVisible=!1,this.isSelected=!1,this.parent=null,this.children=[],this.content=null,this._loader=void 0,this._abortController=null,this._loaderId=0,this._isLoaded=!1,this._isCancelled=!1,this._needsReload=!1}get bbox(){return this._bbox}set bbox(t){this._bbox||(this._bbox=t,"west"in t?this.boundingBox=[[t.west,t.south],[t.east,t.north]]:this.boundingBox=[[t.left,t.top],[t.right,t.bottom]])}get data(){return this.isLoading&&this._loader?this._loader.then(()=>this.data):this.content}get isLoaded(){return this._isLoaded&&!this._needsReload}get isLoading(){return!!this._loader&&!this._isCancelled}get needsReload(){return this._needsReload||this._isCancelled}get byteLength(){const t=this.content?this.content.byteLength:0;return Number.isFinite(t)||console.error("byteLength not defined in tile data"),t}async _loadData({getData:t,requestScheduler:e,onLoad:n,onError:o}){const{index:s,id:r,bbox:a,userData:l,zoom:c}=this,u=this._loaderId;this._abortController=new AbortController;const{signal:d}=this._abortController,h=await e.scheduleRequest(this,m=>m.isSelected?1:-1);if(!h){this._isCancelled=!0;return}if(this._isCancelled){h.done();return}let f=null,p;try{f=await t({index:s,id:r,bbox:a,userData:l,zoom:c,signal:d})}catch(m){p=m||!0}finally{h.done()}if(u===this._loaderId){if(this._loader=void 0,this.content=f,this._isCancelled&&!f){this._isLoaded=!1;return}this._isLoaded=!0,this._isCancelled=!1,p?o(p,this):n(this)}}loadData(t){return this._isLoaded=!1,this._isCancelled=!1,this._needsReload=!1,this._loaderId++,this._loader=this._loadData(t),this._loader}setNeedsReload(){this.isLoading&&(this.abort(),this._loader=void 0),this._needsReload=!0}abort(){var t;this.isLoaded||(this._isCancelled=!0,(t=this._abortController)===null||t===void 0||t.abort())}}const I={OUTSIDE:-1,INTERSECTING:0,INSIDE:1},qe=new x,$o=new x;class de{constructor(t=[0,0,0],e=[0,0,0],n){g(this,"center",void 0),g(this,"halfDiagonal",void 0),g(this,"minimum",void 0),g(this,"maximum",void 0),n=n||qe.copy(t).add(e).scale(.5),this.center=new x(n),this.halfDiagonal=new x(e).subtract(this.center),this.minimum=new x(t),this.maximum=new x(e)}clone(){return new de(this.minimum,this.maximum,this.center)}equals(t){return this===t||!!t&&this.minimum.equals(t.minimum)&&this.maximum.equals(t.maximum)}transform(t){return this.center.transformAsPoint(t),this.halfDiagonal.transform(t),this.minimum.transform(t),this.maximum.transform(t),this}intersectPlane(t){const{halfDiagonal:e}=this,n=$o.from(t.normal),o=e.x*Math.abs(n.x)+e.y*Math.abs(n.y)+e.z*Math.abs(n.z),s=this.center.dot(n)+t.distance;return s-o>0?I.INSIDE:s+o<0?I.OUTSIDE:I.INTERSECTING}distanceTo(t){return Math.sqrt(this.distanceSquaredTo(t))}distanceSquaredTo(t){const e=qe.from(t).subtract(this.center),{halfDiagonal:n}=this;let o=0,s;return s=Math.abs(e.x)-n.x,s>0&&(o+=s*s),s=Math.abs(e.y)-n.y,s>0&&(o+=s*s),s=Math.abs(e.z)-n.z,s>0&&(o+=s*s),o}}const et=new x,Ke=new x;class he{constructor(t=[0,0,0],e=0){g(this,"center",void 0),g(this,"radius",void 0),this.radius=-0,this.center=new x,this.fromCenterRadius(t,e)}fromCenterRadius(t,e){return this.center.from(t),this.radius=e,this}fromCornerPoints(t,e){return e=et.from(e),this.center=new x().from(t).add(e).scale(.5),this.radius=this.center.distance(e),this}equals(t){return this===t||!!t&&this.center.equals(t.center)&&this.radius===t.radius}clone(){return new he(this.center,this.radius)}union(t){const e=this.center,n=this.radius,o=t.center,s=t.radius,r=et.copy(o).subtract(e),a=r.magnitude();if(n>=a+s)return this.clone();if(s>=a+n)return t.clone();const l=(n+a+s)*.5;return Ke.copy(r).scale((-n+l)/a).add(e),this.center.copy(Ke),this.radius=l,this}expand(t){const n=et.from(t).subtract(this.center).magnitude();return n>this.radius&&(this.radius=n),this}transform(t){this.center.transform(t);const e=Gn(et,t);return this.radius=Math.max(e[0],Math.max(e[1],e[2]))*this.radius,this}distanceSquaredTo(t){const e=this.distanceTo(t);return e*e}distanceTo(t){const n=et.from(t).subtract(this.center);return Math.max(0,n.len()-this.radius)}intersectPlane(t){const e=this.center,n=this.radius,s=t.normal.dot(e)+t.distance;return s<-n?I.OUTSIDE:s<n?I.INTERSECTING:I.INSIDE}}const Qo=new x,ts=new x,yt=new x,xt=new x,vt=new x,es=new x,ns=new x,D={COLUMN0ROW0:0,COLUMN0ROW1:1,COLUMN0ROW2:2,COLUMN1ROW0:3,COLUMN1ROW1:4,COLUMN1ROW2:5,COLUMN2ROW0:6,COLUMN2ROW1:7,COLUMN2ROW2:8};class fe{constructor(t=[0,0,0],e=[0,0,0,0,0,0,0,0,0]){g(this,"center",void 0),g(this,"halfAxes",void 0),this.center=new x().from(t),this.halfAxes=new E(e)}get halfSize(){const t=this.halfAxes.getColumn(0),e=this.halfAxes.getColumn(1),n=this.halfAxes.getColumn(2);return[new x(t).len(),new x(e).len(),new x(n).len()]}get quaternion(){const t=this.halfAxes.getColumn(0),e=this.halfAxes.getColumn(1),n=this.halfAxes.getColumn(2),o=new x(t).normalize(),s=new x(e).normalize(),r=new x(n).normalize();return new ve().fromMatrix3(new E([...o,...s,...r]))}fromCenterHalfSizeQuaternion(t,e,n){const o=new ve(n),s=new E().fromQuaternion(o);return s[0]=s[0]*e[0],s[1]=s[1]*e[0],s[2]=s[2]*e[0],s[3]=s[3]*e[1],s[4]=s[4]*e[1],s[5]=s[5]*e[1],s[6]=s[6]*e[2],s[7]=s[7]*e[2],s[8]=s[8]*e[2],this.center=new x().from(t),this.halfAxes=s,this}clone(){return new fe(this.center,this.halfAxes)}equals(t){return this===t||!!t&&this.center.equals(t.center)&&this.halfAxes.equals(t.halfAxes)}getBoundingSphere(t=new he){const e=this.halfAxes,n=e.getColumn(0,yt),o=e.getColumn(1,xt),s=e.getColumn(2,vt),r=Qo.copy(n).add(o).add(s);return t.center.copy(this.center),t.radius=r.magnitude(),t}intersectPlane(t){const e=this.center,n=t.normal,o=this.halfAxes,s=n.x,r=n.y,a=n.z,l=Math.abs(s*o[D.COLUMN0ROW0]+r*o[D.COLUMN0ROW1]+a*o[D.COLUMN0ROW2])+Math.abs(s*o[D.COLUMN1ROW0]+r*o[D.COLUMN1ROW1]+a*o[D.COLUMN1ROW2])+Math.abs(s*o[D.COLUMN2ROW0]+r*o[D.COLUMN2ROW1]+a*o[D.COLUMN2ROW2]),c=n.dot(e)+t.distance;return c<=-l?I.OUTSIDE:c>=l?I.INSIDE:I.INTERSECTING}distanceTo(t){return Math.sqrt(this.distanceSquaredTo(t))}distanceSquaredTo(t){const e=ts.from(t).subtract(this.center),n=this.halfAxes,o=n.getColumn(0,yt),s=n.getColumn(1,xt),r=n.getColumn(2,vt),a=o.magnitude(),l=s.magnitude(),c=r.magnitude();o.normalize(),s.normalize(),r.normalize();let u=0,d;return d=Math.abs(e.dot(o))-a,d>0&&(u+=d*d),d=Math.abs(e.dot(s))-l,d>0&&(u+=d*d),d=Math.abs(e.dot(r))-c,d>0&&(u+=d*d),u}computePlaneDistances(t,e,n=[-0,-0]){let o=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY;const r=this.center,a=this.halfAxes,l=a.getColumn(0,yt),c=a.getColumn(1,xt),u=a.getColumn(2,vt),d=es.copy(l).add(c).add(u).add(r),h=ns.copy(d).subtract(t);let f=e.dot(h);return o=Math.min(f,o),s=Math.max(f,s),d.copy(r).add(l).add(c).subtract(u),h.copy(d).subtract(t),f=e.dot(h),o=Math.min(f,o),s=Math.max(f,s),d.copy(r).add(l).subtract(c).add(u),h.copy(d).subtract(t),f=e.dot(h),o=Math.min(f,o),s=Math.max(f,s),d.copy(r).add(l).subtract(c).subtract(u),h.copy(d).subtract(t),f=e.dot(h),o=Math.min(f,o),s=Math.max(f,s),r.copy(d).subtract(l).add(c).add(u),h.copy(d).subtract(t),f=e.dot(h),o=Math.min(f,o),s=Math.max(f,s),r.copy(d).subtract(l).add(c).subtract(u),h.copy(d).subtract(t),f=e.dot(h),o=Math.min(f,o),s=Math.max(f,s),r.copy(d).subtract(l).subtract(c).add(u),h.copy(d).subtract(t),f=e.dot(h),o=Math.min(f,o),s=Math.max(f,s),r.copy(d).subtract(l).subtract(c).subtract(u),h.copy(d).subtract(t),f=e.dot(h),o=Math.min(f,o),s=Math.max(f,s),n[0]=o,n[1]=s,n}transform(t){this.center.transformAsPoint(t);const e=this.halfAxes.getColumn(0,yt);e.transformAsPoint(t);const n=this.halfAxes.getColumn(1,xt);n.transformAsPoint(t);const o=this.halfAxes.getColumn(2,vt);return o.transformAsPoint(t),this.halfAxes=new E([...e,...n,...o]),this}getTransform(){throw new Error("not implemented")}}const Xe=new x,Ye=new x;class X{constructor(t=[0,0,1],e=0){g(this,"normal",void 0),g(this,"distance",void 0),this.normal=new x,this.distance=-0,this.fromNormalDistance(t,e)}fromNormalDistance(t,e){return jt(Number.isFinite(e)),this.normal.from(t).normalize(),this.distance=e,this}fromPointNormal(t,e){t=Xe.from(t),this.normal.from(e).normalize();const n=-this.normal.dot(t);return this.distance=n,this}fromCoefficients(t,e,n,o){return this.normal.set(t,e,n),jt(Ct(this.normal.len(),1)),this.distance=o,this}clone(){return new X(this.normal,this.distance)}equals(t){return Ct(this.distance,t.distance)&&Ct(this.normal,t.normal)}getPointDistance(t){return this.normal.dot(t)+this.distance}transform(t){const e=Ye.copy(this.normal).transformAsVector(t).normalize(),n=this.normal.scale(-this.distance).transform(t);return this.fromPointNormal(n,e)}projectPointOntoPlane(t,e=[0,0,0]){t=Xe.from(t);const n=this.getPointDistance(t),o=Ye.copy(this.normal).scale(n);return t.subtract(o).to(e)}}const Je=[new x([1,0,0]),new x([0,1,0]),new x([0,0,1])],$e=new x,is=new x;new X(new x(1,0,0),0);class B{constructor(t=[]){g(this,"planes",void 0),this.planes=t}fromBoundingSphere(t){this.planes.length=2*Je.length;const e=t.center,n=t.radius;let o=0;for(const s of Je){let r=this.planes[o],a=this.planes[o+1];r||(r=this.planes[o]=new X),a||(a=this.planes[o+1]=new X);const l=$e.copy(s).scale(-n).add(e);-s.dot(l),r.fromPointNormal(l,s);const c=$e.copy(s).scale(n).add(e),u=is.copy(s).negate();-u.dot(c),a.fromPointNormal(c,u),o+=2}return this}computeVisibility(t){let e=I.INSIDE;for(const n of this.planes)switch(t.intersectPlane(n)){case I.OUTSIDE:return I.OUTSIDE;case I.INTERSECTING:e=I.INTERSECTING;break}return e}computeVisibilityWithPlaneMask(t,e){if(jt(Number.isFinite(e),"parentPlaneMask is required."),e===B.MASK_OUTSIDE||e===B.MASK_INSIDE)return e;let n=B.MASK_INSIDE;const o=this.planes;for(let s=0;s<this.planes.length;++s){const r=s<31?1<<s:0;if(s<31&&!(e&r))continue;const a=o[s],l=t.intersectPlane(a);if(l===I.OUTSIDE)return B.MASK_OUTSIDE;l===I.INTERSECTING&&(n|=r)}return n}}g(B,"MASK_OUTSIDE",4294967295);g(B,"MASK_INSIDE",0);g(B,"MASK_INDETERMINATE",2147483647);new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;new x;const F=new E,os=new E,ss=new E,_t=new E,Qe=new E;function rs(i,t={}){const e=an.EPSILON20,n=10;let o=0,s=0;const r=os,a=ss;r.identity(),a.copy(i);const l=e*as(a);for(;s<n&&ls(a)>l;)cs(a,_t),Qe.copy(_t).transpose(),a.multiplyRight(_t),a.multiplyLeft(Qe),r.multiplyRight(_t),++o>2&&(++s,o=0);return t.unitary=r.toTarget(t.unitary),t.diagonal=a.toTarget(t.diagonal),t}function as(i){let t=0;for(let e=0;e<9;++e){const n=i[e];t+=n*n}return Math.sqrt(t)}const $t=[1,0,0],Qt=[2,2,1];function ls(i){let t=0;for(let e=0;e<3;++e){const n=i[F.getElementIndex(Qt[e],$t[e])];t+=2*n*n}return Math.sqrt(t)}function cs(i,t){const e=an.EPSILON15;let n=0,o=1;for(let c=0;c<3;++c){const u=Math.abs(i[F.getElementIndex(Qt[c],$t[c])]);u>n&&(o=c,n=u)}const s=$t[o],r=Qt[o];let a=1,l=0;if(Math.abs(i[F.getElementIndex(r,s)])>e){const c=i[F.getElementIndex(r,r)],u=i[F.getElementIndex(s,s)],d=i[F.getElementIndex(r,s)],h=(c-u)/2/d;let f;h<0?f=-1/(-h+Math.sqrt(1+h*h)):f=1/(h+Math.sqrt(1+h*h)),a=1/Math.sqrt(1+f*f),l=f*a}return E.IDENTITY.to(t),t[F.getElementIndex(s,s)]=t[F.getElementIndex(r,r)]=a,t[F.getElementIndex(r,s)]=l,t[F.getElementIndex(s,r)]=-l,t}const U=new x,us=new x,ds=new x,hs=new x,fs=new x,gs=new E,ps={diagonal:new E,unitary:new E};function ms(i,t=new fe){if(!i||i.length===0)return t.halfAxes=new E([0,0,0,0,0,0,0,0,0]),t.center=new x,t;const e=i.length,n=new x(0,0,0);for(const w of i)n.add(w);const o=1/e;n.multiplyByScalar(o);let s=0,r=0,a=0,l=0,c=0,u=0;for(const w of i){const A=U.copy(w).subtract(n);s+=A.x*A.x,r+=A.x*A.y,a+=A.x*A.z,l+=A.y*A.y,c+=A.y*A.z,u+=A.z*A.z}s*=o,r*=o,a*=o,l*=o,c*=o,u*=o;const d=gs;d[0]=s,d[1]=r,d[2]=a,d[3]=r,d[4]=l,d[5]=c,d[6]=a,d[7]=c,d[8]=u;const{unitary:h}=rs(d,ps),f=t.halfAxes.copy(h);let p=f.getColumn(0,ds),m=f.getColumn(1,hs),y=f.getColumn(2,fs),_=-Number.MAX_VALUE,C=-Number.MAX_VALUE,v=-Number.MAX_VALUE,P=Number.MAX_VALUE,L=Number.MAX_VALUE,b=Number.MAX_VALUE;for(const w of i)U.copy(w),_=Math.max(U.dot(p),_),C=Math.max(U.dot(m),C),v=Math.max(U.dot(y),v),P=Math.min(U.dot(p),P),L=Math.min(U.dot(m),L),b=Math.min(U.dot(y),b);p=p.multiplyByScalar(.5*(P+_)),m=m.multiplyByScalar(.5*(L+C)),y=y.multiplyByScalar(.5*(b+v)),t.center.copy(p).add(m).add(y);const M=us.set(_-P,C-L,v-b).multiplyByScalar(.5),z=new E([M[0],0,0,0,M[1],0,0,0,M[2]]);return t.halfAxes.multiplyRight(z),t}const Z=512,tn=3,In=[[.5,.5],[0,0],[0,1],[1,0],[1,1]],Mn=In.concat([[0,.5],[.5,0],[1,.5],[.5,1]]),ys=Mn.concat([[.25,.5],[.75,.5]]);class q{constructor(t,e,n){g(this,"x",void 0),g(this,"y",void 0),g(this,"z",void 0),g(this,"childVisible",void 0),g(this,"selected",void 0),g(this,"_children",void 0),this.x=t,this.y=e,this.z=n}get children(){if(!this._children){const t=this.x*2,e=this.y*2,n=this.z+1;this._children=[new q(t,e,n),new q(t,e+1,n),new q(t+1,e,n),new q(t+1,e+1,n)]}return this._children}update(t){const{viewport:e,cullingVolume:n,elevationBounds:o,minZ:s,maxZ:r,bounds:a,offset:l,project:c}=t,u=this.getBoundingVolume(o,l,c);if(a&&!this.insideBounds(a)||n.computeVisibility(u)<0)return!1;if(!this.childVisible){let{z:h}=this;if(h<r&&h>=s){const f=u.distanceTo(e.cameraPosition)*e.scale/e.height;h+=Math.floor(Math.log2(f))}if(h>=r)return this.selected=!0,!0}this.selected=!1,this.childVisible=!0;for(const h of this.children)h.update(t);return!0}getSelected(t=[]){if(this.selected&&t.push(this),this._children)for(const e of this._children)e.getSelected(t);return t}insideBounds([t,e,n,o]){const s=Math.pow(2,this.z),r=Z/s;return this.x*r<n&&this.y*r<o&&(this.x+1)*r>t&&(this.y+1)*r>e}getBoundingVolume(t,e,n){if(n){const l=this.z<1?ys:this.z<2?Mn:In,c=[];for(const u of l){const d=ee(this.x+u[0],this.y+u[1],this.z);d[2]=t[0],c.push(n(d)),t[0]!==t[1]&&(d[2]=t[1],c.push(n(d)))}return ms(c)}const o=Math.pow(2,this.z),s=Z/o,r=this.x*s+e*Z,a=Z-(this.y+1)*s;return new de([r,a,t[0]],[r+s,a+s,t[1]])}}function xs(i,t,e,n){const o=i instanceof Vn&&i.resolution?i.projectPosition:null,s=Object.values(i.getFrustumPlanes()).map(({normal:f,distance:p})=>new X(f.clone().negate(),p)),r=new B(s),a=i.distanceScales.unitsPerMeter[2],l=e&&e[0]*a||0,c=e&&e[1]*a||0,u=i instanceof _e&&i.pitch<=60?t:0;if(n){const[f,p,m,y]=n,_=wt([f,y]),C=wt([m,p]);n=[_[0],Z-_[1],C[0],Z-C[1]]}const d=new q(0,0,0),h={viewport:i,project:o,cullingVolume:r,elevationBounds:[l,c],minZ:u,maxZ:t,bounds:n,offset:0};if(d.update(h),i instanceof _e&&i.subViewports&&i.subViewports.length>1){for(h.offset=-1;d.update(h)&&!(--h.offset<-tn););for(h.offset=1;d.update(h)&&!(++h.offset>tn););}return d.getSelected()}const k=512,vs=[-1/0,-1/0,1/0,1/0],_s={type:"object",value:null,validate:(i,t)=>t.optional&&i===null||typeof i=="string"||Array.isArray(i)&&i.every(e=>typeof e=="string"),equal:(i,t)=>{if(i===t)return!0;if(!Array.isArray(i)||!Array.isArray(t))return!1;const e=i.length;if(e!==t.length)return!1;for(let n=0;n<e;n++)if(i[n]!==t[n])return!1;return!0}};function An(i,t){const e=[t.transformAsPoint([i[0],i[1]]),t.transformAsPoint([i[2],i[1]]),t.transformAsPoint([i[0],i[3]]),t.transformAsPoint([i[2],i[3]])];return[Math.min(...e.map(o=>o[0])),Math.min(...e.map(o=>o[1])),Math.max(...e.map(o=>o[0])),Math.max(...e.map(o=>o[1]))]}function Ps(i){return Math.abs(i.split("").reduce((t,e)=>(t<<5)-t+e.charCodeAt(0)|0,0))}function Cs(i,t){if(!i||!i.length)return null;const{index:e,id:n}=t;if(Array.isArray(i)){const s=Ps(n)%i.length;i=i[s]}let o=i;for(const s of Object.keys(e)){const r=new RegExp("{".concat(s,"}"),"g");o=o.replace(r,String(e[s]))}return Number.isInteger(e.y)&&Number.isInteger(e.z)&&(o=o.replace(/\{-y\}/g,String(Math.pow(2,e.z)-e.y-1))),o}function Ls(i,t,e){let n;if(t&&t.length===2){const[o,s]=t,r=i.getBounds({z:o}),a=i.getBounds({z:s});n=[Math.min(r[0],a[0]),Math.min(r[1],a[1]),Math.max(r[2],a[2]),Math.max(r[3],a[3])]}else n=i.getBounds();return i.isGeospatial?[Math.max(n[0],e[0]),Math.max(n[1],e[1]),Math.min(n[2],e[2]),Math.min(n[3],e[3])]:[Math.max(Math.min(n[0],e[2]),e[0]),Math.max(Math.min(n[1],e[3]),e[1]),Math.min(Math.max(n[2],e[0]),e[2]),Math.min(Math.max(n[3],e[1]),e[3])]}function Ss({viewport:i,z:t=0,cullRect:e}){return(i.subViewports||[i]).map(o=>te(o,t,e))}function te(i,t,e){if(!Array.isArray(t)){const s=e.x-i.x,r=e.y-i.y,{width:a,height:l}=e,c={targetZ:t},u=i.unproject([s,r],c),d=i.unproject([s+a,r],c),h=i.unproject([s,r+l],c),f=i.unproject([s+a,r+l],c);return[Math.min(u[0],d[0],h[0],f[0]),Math.min(u[1],d[1],h[1],f[1]),Math.max(u[0],d[0],h[0],f[0]),Math.max(u[1],d[1],h[1],f[1])]}const n=te(i,t[0],e),o=te(i,t[1],e);return[Math.min(n[0],o[0]),Math.min(n[1],o[1]),Math.max(n[2],o[2]),Math.max(n[3],o[3])]}function bs(i,t,e){return e?An(i,e).map(o=>o*t/k):i.map(n=>n*t/k)}function ge(i,t){return Math.pow(2,i)*k/t}function ee(i,t,e){const n=ge(e,k),o=i/n*360-180,s=Math.PI-2*Math.PI*t/n,r=180/Math.PI*Math.atan(.5*(Math.exp(s)-Math.exp(-s)));return[o,r]}function en(i,t,e,n){const o=ge(e,n);return[i/o*k,t/o*k]}function Ts(i,t,e,n,o=k){if(i.isGeospatial){const[c,u]=ee(t,e,n),[d,h]=ee(t+1,e+1,n);return{west:c,north:u,east:d,south:h}}const[s,r]=en(t,e,n,o),[a,l]=en(t+1,e+1,n,o);return{left:s,top:r,right:a,bottom:l}}function ws(i,t,e,n,o){const s=Ls(i,null,n),r=ge(t,e),[a,l,c,u]=bs(s,r,o),d=[];for(let h=Math.floor(a);h<c;h++)for(let f=Math.floor(l);f<u;f++)d.push({x:h,y:f,z:t});return d}function Is({viewport:i,maxZoom:t,minZoom:e,zRange:n,extent:o,tileSize:s=k,modelMatrix:r,modelMatrixInverse:a,zoomOffset:l=0}){let c=i.isGeospatial?Math.round(i.zoom+Math.log2(k/s))+l:Math.ceil(i.zoom)+l;if(typeof e=="number"&&Number.isFinite(e)&&c<e){if(!o)return[];c=e}typeof t=="number"&&Number.isFinite(t)&&c>t&&(c=t);let u=o;return r&&a&&o&&!i.isGeospatial&&(u=An(o,r)),i.isGeospatial?xs(i,c,n,o):ws(i,c,s,u||vs,a)}function Ms(i){let t={},e;return n=>{for(const o in n)if(!As(n[o],t[o])){e=i(n),t=n;break}return e}}function As(i,t){if(i===t)return!0;if(Array.isArray(i)){const e=i.length;if(!t||t.length!==e)return!1;for(let n=0;n<e;n++)if(i[n]!==t[n])return!1;return!0}return!1}const nn=1,Ft=2,Es="never",Os="no-overlap",pe="best-available",zs=5,Rs={[pe]:Ds,[Os]:Bs,[Es]:()=>{}},Fs={extent:null,tileSize:512,maxZoom:null,minZoom:null,maxCacheSize:null,maxCacheByteSize:null,refinementStrategy:"best-available",zRange:null,maxRequests:6,zoomOffset:0,onTileLoad:()=>{},onTileUnload:()=>{},onTileError:()=>{}};class Ns{constructor(t){g(this,"opts",void 0),g(this,"_requestScheduler",void 0),g(this,"_cache",void 0),g(this,"_dirty",void 0),g(this,"_tiles",void 0),g(this,"_cacheByteSize",void 0),g(this,"_viewport",void 0),g(this,"_zRange",void 0),g(this,"_selectedTiles",void 0),g(this,"_frameNumber",void 0),g(this,"_modelMatrix",void 0),g(this,"_modelMatrixInverse",void 0),g(this,"_maxZoom",void 0),g(this,"_minZoom",void 0),g(this,"onTileLoad",void 0),g(this,"_getCullBounds",Ms(Ss)),this.opts={...Fs,...t},this.onTileLoad=e=>{var n,o;(n=(o=this.opts).onTileLoad)===null||n===void 0||n.call(o,e),this.opts.maxCacheByteSize&&(this._cacheByteSize+=e.byteLength,this._resizeCache())},this._requestScheduler=new jn({maxRequests:t.maxRequests,throttleRequests:!!(t.maxRequests&&t.maxRequests>0)}),this._cache=new Map,this._tiles=[],this._dirty=!1,this._cacheByteSize=0,this._viewport=null,this._selectedTiles=null,this._frameNumber=0,this._modelMatrix=new Dt,this._modelMatrixInverse=new Dt,this.setOptions(t)}get tiles(){return this._tiles}get selectedTiles(){return this._selectedTiles}get isLoaded(){return this._selectedTiles!==null&&this._selectedTiles.every(t=>t.isLoaded)}get needsReload(){return this._selectedTiles!==null&&this._selectedTiles.some(t=>t.needsReload)}setOptions(t){Object.assign(this.opts,t),Number.isFinite(t.maxZoom)&&(this._maxZoom=Math.floor(t.maxZoom)),Number.isFinite(t.minZoom)&&(this._minZoom=Math.ceil(t.minZoom))}finalize(){for(const t of this._cache.values())t.isLoading&&t.abort();this._cache.clear(),this._tiles=[],this._selectedTiles=null}reloadAll(){for(const t of this._cache.keys()){const e=this._cache.get(t);!this._selectedTiles||!this._selectedTiles.includes(e)?this._cache.delete(t):e.setNeedsReload()}}update(t,{zRange:e,modelMatrix:n}={}){const o=new Dt(n),s=!o.equals(this._modelMatrix);if(!this._viewport||!t.equals(this._viewport)||!Ct(this._zRange,e)||s){s&&(this._modelMatrixInverse=o.clone().invert(),this._modelMatrix=o),this._viewport=t,this._zRange=e;const a=this.getTileIndices({viewport:t,maxZoom:this._maxZoom,minZoom:this._minZoom,zRange:e,modelMatrix:this._modelMatrix,modelMatrixInverse:this._modelMatrixInverse});this._selectedTiles=a.map(l=>this._getTile(l,!0)),this._dirty&&this._rebuildTree()}else this.needsReload&&(this._selectedTiles=this._selectedTiles.map(a=>this._getTile(a.index,!0)));const r=this.updateTileStates();return this._pruneRequests(),this._dirty&&this._resizeCache(),r&&this._frameNumber++,this._frameNumber}isTileVisible(t,e){if(!t.isVisible)return!1;if(e&&this._viewport){const n=this._getCullBounds({viewport:this._viewport,z:this._zRange,cullRect:e}),{bbox:o}=t;for(const[s,r,a,l]of n){let c;if("west"in o)c=o.west<a&&o.east>s&&o.south<l&&o.north>r;else{const u=Math.min(o.top,o.bottom),d=Math.max(o.top,o.bottom);c=o.left<a&&o.right>s&&u<l&&d>r}if(c)return!0}return!1}return!0}getTileIndices({viewport:t,maxZoom:e,minZoom:n,zRange:o,modelMatrix:s,modelMatrixInverse:r}){const{tileSize:a,extent:l,zoomOffset:c}=this.opts;return Is({viewport:t,maxZoom:e,minZoom:n,zRange:o,tileSize:a,extent:l,modelMatrix:s,modelMatrixInverse:r,zoomOffset:c})}getTileId(t){return"".concat(t.x,"-").concat(t.y,"-").concat(t.z)}getTileZoom(t){return t.z}getTileMetadata(t){const{tileSize:e}=this.opts;return{bbox:Ts(this._viewport,t.x,t.y,t.z,e)}}getParentIndex(t){const e=Math.floor(t.x/2),n=Math.floor(t.y/2),o=t.z-1;return{x:e,y:n,z:o}}updateTileStates(){const t=this.opts.refinementStrategy||pe,e=new Array(this._cache.size);let n=0;for(const o of this._cache.values())e[n++]=o.isVisible,o.isSelected=!1,o.isVisible=!1;for(const o of this._selectedTiles)o.isSelected=!0,o.isVisible=!0;(typeof t=="function"?t:Rs[t])(Array.from(this._cache.values())),n=0;for(const o of this._cache.values())if(e[n++]!==o.isVisible)return!0;return!1}_pruneRequests(){const{maxRequests:t=0}=this.opts,e=[];let n=0;for(const o of this._cache.values())o.isLoading&&(n++,!o.isSelected&&!o.isVisible&&e.push(o));for(;t>0&&n>t&&e.length>0;)e.shift().abort(),n--}_rebuildTree(){const{_cache:t}=this;for(const e of t.values())e.parent=null,e.children&&(e.children.length=0);for(const e of t.values()){const n=this._getNearestAncestor(e);e.parent=n,n!=null&&n.children&&n.children.push(e)}}_resizeCache(){const{_cache:t,opts:e}=this,n=e.maxCacheSize||(e.maxCacheByteSize?1/0:zs*this.selectedTiles.length),o=e.maxCacheByteSize||1/0;if(t.size>n||this._cacheByteSize>o){for(const[l,c]of t){if(!c.isVisible&&!c.isSelected){var r,a;this._cacheByteSize-=e.maxCacheByteSize?c.byteLength:0,t.delete(l),(r=(a=this.opts).onTileUnload)===null||r===void 0||r.call(a,c)}if(t.size<=n&&this._cacheByteSize<=o)break}this._rebuildTree(),this._dirty=!0}this._dirty&&(this._tiles=Array.from(this._cache.values()).sort((l,c)=>l.zoom-c.zoom),this._dirty=!1)}_getTile(t,e){const n=this.getTileId(t);let o=this._cache.get(n),s=!1;return!o&&e?(o=new Jo(t),Object.assign(o,this.getTileMetadata(o.index)),Object.assign(o,{id:n,zoom:this.getTileZoom(o.index)}),s=!0,this._cache.set(n,o),this._dirty=!0):o&&o.needsReload&&(s=!0),o&&s&&o.loadData({getData:this.opts.getTileData,requestScheduler:this._requestScheduler,onLoad:this.onTileLoad,onError:this.opts.onTileError}),o}_getNearestAncestor(t){const{_minZoom:e=0}=this;let n=t.index;for(;this.getTileZoom(n)>e;){n=this.getParentIndex(n);const o=this._getTile(n);if(o)return o}return null}}function Ds(i){for(const t of i)t.state=0;for(const t of i)t.isSelected&&!En(t)&&me(t);for(const t of i)t.isVisible=!!(t.state&Ft)}function Bs(i){for(const e of i)e.state=0;for(const e of i)e.isSelected&&En(e);const t=Array.from(i).sort((e,n)=>e.zoom-n.zoom);for(const e of t)if(e.isVisible=!!(e.state&Ft),e.children&&(e.isVisible||e.state&nn))for(const n of e.children)n.state=nn;else e.isSelected&&me(e)}function En(i){let t=i;for(;t;){if(t.isLoaded||t.content)return t.state|=Ft,!0;t=t.parent}return!1}function me(i){for(const t of i.children)t.isLoaded||t.content?t.state|=Ft:me(t)}const ks={TilesetClass:Ns,data:{type:"data",value:[]},dataComparator:_s.equal,renderSubLayers:{type:"function",value:i=>new Rt(i)},getTileData:{type:"function",optional:!0,value:null},onViewportLoad:{type:"function",optional:!0,value:null},onTileLoad:{type:"function",value:i=>{}},onTileUnload:{type:"function",value:i=>{}},onTileError:{type:"function",value:i=>console.error(i)},extent:{type:"array",optional:!0,value:null,compare:!0},tileSize:512,maxZoom:null,minZoom:0,maxCacheSize:null,maxCacheByteSize:null,refinementStrategy:pe,zRange:null,maxRequests:6,zoomOffset:0};class ye extends ne{initializeState(){this.state={tileset:null,isLoaded:!1}}finalizeState(){var t,e;(t=this.state)===null||t===void 0||(e=t.tileset)===null||e===void 0||e.finalize()}get isLoaded(){var t,e,n;return(t=this.state)===null||t===void 0||(e=t.tileset)===null||e===void 0||(n=e.selectedTiles)===null||n===void 0?void 0:n.every(o=>o.isLoaded&&o.layers&&o.layers.every(s=>s.isLoaded))}shouldUpdateState({changeFlags:t}){return t.somethingChanged}updateState({changeFlags:t}){let{tileset:e}=this.state;const n=t.propsOrDataChanged||t.updateTriggersChanged,o=t.dataChanged||t.updateTriggersChanged&&(t.updateTriggersChanged.all||t.updateTriggersChanged.getTileData);e?n&&(e.setOptions(this._getTilesetOptions()),o?e.reloadAll():this.state.tileset.tiles.forEach(s=>{s.layers=null})):(e=new this.props.TilesetClass(this._getTilesetOptions()),this.setState({tileset:e})),this._updateTileset()}_getTilesetOptions(){const{tileSize:t,maxCacheSize:e,maxCacheByteSize:n,refinementStrategy:o,extent:s,maxZoom:r,minZoom:a,maxRequests:l,zoomOffset:c}=this.props;return{maxCacheSize:e,maxCacheByteSize:n,maxZoom:r,minZoom:a,tileSize:t,refinementStrategy:o,extent:s,maxRequests:l,zoomOffset:c,getTileData:this.getTileData.bind(this),onTileLoad:this._onTileLoad.bind(this),onTileError:this._onTileError.bind(this),onTileUnload:this._onTileUnload.bind(this)}}_updateTileset(){const{tileset:t}=this.state,{zRange:e,modelMatrix:n}=this.props,o=t.update(this.context.viewport,{zRange:e,modelMatrix:n}),{isLoaded:s}=t,r=this.state.isLoaded!==s,a=this.state.frameNumber!==o;s&&(r||a)&&this._onViewportLoad(),a&&this.setState({frameNumber:o}),this.state.isLoaded=s}_onViewportLoad(){const{tileset:t}=this.state,{onViewportLoad:e}=this.props;e&&e(t.selectedTiles)}_onTileLoad(t){this.props.onTileLoad(t),t.layers=null,this.setNeedsUpdate()}_onTileError(t,e){this.props.onTileError(t),e.layers=null,this.setNeedsUpdate()}_onTileUnload(t){this.props.onTileUnload(t)}getTileData(t){const{data:e,getTileData:n,fetch:o}=this.props,{signal:s}=t;return t.url=typeof e=="string"||Array.isArray(e)?Cs(e,t):null,n?n(t):o&&t.url?o(t.url,{propName:"data",layer:this,signal:s}):null}renderSubLayers(t){return this.props.renderSubLayers(t)}getSubLayerPropsByTile(t){return null}getPickingInfo({info:t,sourceLayer:e}){const n=e.props.tile;return t.picked&&(t.tile=n),t.sourceTile=n,t}_updateAutoHighlight(t){const e=t.sourceTile;if(e&&e.layers)for(const n of e.layers)n.updateAutoHighlight(t)}renderLayers(){return this.state.tileset.tiles.map(t=>{const e=this.getSubLayerPropsByTile(t);if(!(!t.isLoaded&&!t.content))if(t.layers)e&&t.layers[0]&&Object.keys(e).some(n=>t.layers[0].props[n]!==e[n])&&(t.layers=t.layers.map(n=>n.clone(e)));else{const n=this.renderSubLayers({...this.props,...this.getSubLayerProps({id:t.id,updateTriggers:this.props.updateTriggers}),data:t.content,_offset:0,tile:t});t.layers=Hn(n,Boolean).map(o=>o.clone({tile:t,...e}))}return t.layers})}filterSubLayer({layer:t,cullRect:e}){const{tile:n}=t.props;return this.state.tileset.isTileVisible(n,e)}}g(ye,"defaultProps",ks);g(ye,"layerName","TileLayer");function Us({data:i}){const t=new Rt({id:"geojson-layer",data:i,stroked:!0,filled:!0,lineWidthScale:20,lineWidthMinPixels:2,getFillColor:[0,255,0,200],getLineColor:[0,0,0],getLineWidth:1});return[new ye({id:"tile-layer",data:"https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",minZoom:0,maxZoom:19,tileSize:256,renderSubLayers:n=>{const{bbox:{west:o,south:s,east:r,north:a}}=n.tile;return new ie(n,{data:void 0,image:n.data,bounds:[o,s,r,a]})}}),t]}const Ws={latitude:35.73202612464274,longitude:137.53268402693763,bearing:0,pitch:0,zoom:4};function Gs(){const[i,t]=Pt.useState(void 0),[e]=Pt.useState(Ws);return Pt.useEffect(()=>{(async()=>{const s=await(await fetch("./data/pref.geojson")).json();t(s)})()},[]),G.jsxs(G.Fragment,{children:[G.jsx(qn,{views:new Zn({repeat:!0}),initialViewState:e,controller:!0,layers:Us({data:i})}),G.jsx("div",{className:"attribution",children:G.jsx("a",{href:"http://www.openstreetmap.org/about/",target:"_blank",rel:"noopener noreferrer",children:"© OpenStreetMap"})})]})}Ht.createRoot(document.getElementById("root")).render(G.jsx(Nn.StrictMode,{children:G.jsx(Gs,{})}));
