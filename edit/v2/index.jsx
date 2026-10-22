import React from 'react';
import {AbsoluteFill,Composition,OffthreadVideo,Sequence,staticFile,useCurrentFrame,interpolate,Easing,registerRoot} from 'remotion';
const C='#F4F3EF',B='#111315',L='#D5FF70';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const mix=(f,a,b,x,y)=>interpolate(f,[a,b],[x,y],clamp);
const out=Easing.bezier(.16,1,.3,1);
const ease=(f,a,b,x,y)=>interpolate(f,[a,b],[x,y],{...clamp,easing:out});
const clips=[
 {f:0,n:24,s:8,r:1,z:[1.18,1.03],x:[-65,0]},
 {f:24,n:42,s:1.3,r:1.15,z:[1.13,1],x:[0,0]},
 {f:66,n:39,s:2.91,r:1.2,z:[1,1.09],x:[0,0]},
 {f:105,n:42,s:4.47,r:.8,z:[1.09,1],x:[0,0]},
 {f:147,n:36,s:5.59,r:1.55,z:[1.04,1.16],x:[0,-25]},
 {f:183,n:27,s:7.45,r:1.9,z:[1.09,1],x:[45,0]},
 {f:210,n:42,s:9.16,r:1.6,z:[1,1.06],x:[0,0]},
 {f:252,n:48,s:11.4,r:1.2,z:[1.08,1],x:[0,0]},
 {f:300,n:72,s:13.32,r:1,z:[1,1.035],x:[0,0]},
];
const Shot=({c})=>{const f=useCurrentFrame(); const z=mix(f,0,c.n,...c.z);const x=mix(f,0,c.n,...c.x);return <AbsoluteFill style={{overflow:'hidden'}}><OffthreadVideo muted src={staticFile('source.mp4')} startFrom={Math.round(c.s*30)} playbackRate={c.r} style={{width:'100%',height:'100%',objectFit:'cover',transform:`translateX(${x}px) scale(${z})`}}/></AbsoluteFill>};
const LetterLine=({text,from,top,size,color=B})=>{const f=useCurrentFrame();return <div style={{position:'absolute',left:70,top,fontSize:size,fontWeight:700,letterSpacing:-size*.065,lineHeight:1,whiteSpace:'nowrap',color,display:'flex',overflow:'hidden',paddingBottom:15}}>{[...text].map((c,i)=><span key={i} style={{display:'inline-block',transform:`translateY(${ease(f,from+i*.65,from+12+i*.65,150,0)}px)`,opacity:mix(f,from+i*.65,from+4+i*.65,0,1)}}>{c===' '? '\u00a0':c}</span>)}</div>};
const Reel=()=>{const f=useCurrentFrame();const introOut=mix(f,20,27,1,0);const secondOut=ease(f,57,67,0,-210);return <AbsoluteFill style={{background:C,color:B,fontFamily:'KH, sans-serif'}}>
<style>{`@font-face{font-family:KH;src:url('${staticFile('font.ttf')}');font-weight:700}*{box-sizing:border-box}`}</style>
{clips.map((c,i)=><Sequence from={c.f} durationInFrames={c.n} key={i}><Shot c={c}/></Sequence>)}
{/* Opening macro moves from frame one; type is cut into the product composition. */}
{f<29&&<AbsoluteFill style={{opacity:introOut}}><div style={{position:'absolute',inset:0,background:'linear-gradient(#111315a8 0%,transparent 45%,#111315d9 100%)'}}/><div style={{position:'absolute',left:70,top:170,fontSize:22,letterSpacing:6,color:C,transform:`translateX(${ease(f,0,12,-75,0)}px)`}}>KH STUDIO</div><LetterLine text="Z OBALU." from={-8} top={1330} size={158} color={C}/><div style={{position:'absolute',left:78,top:1535,width:mix(f,0,18,0,680),height:5,background:L}}/></AbsoluteFill>}
{f>=24&&f<68&&<AbsoluteFill style={{transform:`translateY(${secondOut}px)`}}><LetterLine text="DO" from={24} top={195} size={220}/><LetterLine text="POHYBU." from={29} top={1405} size={159}/></AbsoluteFill>}
{/* Three narrow moving shutters connect the macro into the wide product shot. */}
{f>=21&&f<29&&[0,1,2].map(i=>{const q=mix(f,21+i,26+i,0,1);return <div key={i} style={{position:'absolute',left:i*360,top:0,width:361,height:1920,background:C,transform:`translateY(${q<.5?(1-q*2)*1920:-(q-.5)*3840}px)`}}/>})}
{/* A short editorial signature rides over the final hero, no CTA screen. */}
{f>=306&&<div style={{position:'absolute',left:72,right:115,top:1435,transform:`translateY(${ease(f,306,323,65,0)}px)`,opacity:mix(f,306,316,0,1)}}><div style={{width:mix(f,309,334,0,58),height:5,background:B,marginBottom:26}}/><div style={{fontSize:30,fontWeight:700,letterSpacing:3,lineHeight:1.5}}>PRODUKTOVÉ ANIMACE.<br/>MOTION DESIGN.</div></div>}
</AbsoluteFill>};
registerRoot(()=> <Composition id="KHStudioV2" component={Reel} width={1080} height={1920} fps={30} durationInFrames={372}/>);
