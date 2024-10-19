import React from "react";
import type { SVGProps } from "react";

export type IconNames = "spinner" | "home" | "save" | "folder" | "folder-open" | "chevron-down" | "chevron-up" | "square" | "square-checked" | "rocket";

export default function Icon({ icon, ...props }: { icon: IconNames } & SVGProps<SVGSVGElement>) {
    const components: Record<IconNames, React.ReactNode> = {
        "spinner": <Spinner {...props} />,
        "home": <Home {...props} />,
        "save": <Save {...props} />,
        "folder": <Folder {...props} />,
        "folder-open": <FolderOpen {...props} />,
        "chevron-down": <ChevronDown {...props} />,
        "chevron-up": <ChevronUp {...props} />,
        "square": <Square {...props} />,
        "square-checked": <SquareChecked {...props} />,
        "rocket": <Rocket {...props} />
    };
    
    return components[icon];
}

function Spinner(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><circle cx={4} cy={12} r={0} fill="currentColor"><animate fill="freeze" attributeName="r" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"></animate><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"></animate><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"></animate><animate id="svgSpinners3DotsMove0" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"></animate><animate id="svgSpinners3DotsMove1" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove0.end" dur="0.001s" values="20;4"></animate></circle><circle cx={4} cy={12} r={3} fill="currentColor"><animate fill="freeze" attributeName="cx" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"></animate><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"></animate><animate id="svgSpinners3DotsMove2" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"></animate><animate id="svgSpinners3DotsMove3" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove2.end" dur="0.001s" values="20;4"></animate><animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"></animate></circle><circle cx={12} cy={12} r={3} fill="currentColor"><animate fill="freeze" attributeName="cx" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"></animate><animate id="svgSpinners3DotsMove4" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"></animate><animate id="svgSpinners3DotsMove5" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove4.end" dur="0.001s" values="20;4"></animate><animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"></animate><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"></animate></circle><circle cx={20} cy={12} r={3} fill="currentColor"><animate id="svgSpinners3DotsMove6" fill="freeze" attributeName="r" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"></animate><animate id="svgSpinners3DotsMove7" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove6.end" dur="0.001s" values="20;4"></animate><animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"></animate><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"></animate><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"></animate></circle></svg>);
}

function Home(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M10.55 2.532a2.25 2.25 0 0 1 2.9 0l6.75 5.692c.507.428.8 1.057.8 1.72v9.31a1.75 1.75 0 0 1-1.75 1.75h-3.5a1.75 1.75 0 0 1-1.75-1.75v-5.007a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25v5.007a1.75 1.75 0 0 1-1.75 1.75h-3.5A1.75 1.75 0 0 1 3 19.254v-9.31c0-.663.293-1.292.8-1.72zm1.933 1.147a.75.75 0 0 0-.966 0L4.767 9.37a.75.75 0 0 0-.267.573v9.31c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25v-5.007c0-.967.784-1.75 1.75-1.75h3.5c.966 0 1.75.783 1.75 1.75v5.007c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25v-9.31a.75.75 0 0 0-.267-.573z"></path></svg>);
}

function Save(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M3 5.75A2.75 2.75 0 0 1 5.75 3h9.965a3.25 3.25 0 0 1 2.298.952l2.035 2.035c.61.61.952 1.437.952 2.299v9.964A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25zM5.75 4.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25H6v-5.25A2.25 2.25 0 0 1 8.25 12h7.5A2.25 2.25 0 0 1 18 14.25v5.25h.25c.69 0 1.25-.56 1.25-1.25V8.286c0-.465-.184-.91-.513-1.238l-2.035-2.035a1.75 1.75 0 0 0-.952-.49V7.25a2.25 2.25 0 0 1-2.25 2.25h-4.5A2.25 2.25 0 0 1 7 7.25V4.5zm10.75 15v-5.25a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v5.25zm-8-15v2.75c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V4.5z"></path></svg>);
}

function Folder(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M3.5 6.25V8h4.629a.75.75 0 0 0 .53-.22l1.53-1.53l-1.53-1.53a.75.75 0 0 0-.53-.22H5.25A1.75 1.75 0 0 0 3.5 6.25m-1.5 0A3.25 3.25 0 0 1 5.25 3h2.879a2.25 2.25 0 0 1 1.59.659L11.562 5.5h7.189A3.25 3.25 0 0 1 22 8.75v9A3.25 3.25 0 0 1 18.75 21H5.25A3.25 3.25 0 0 1 2 17.75zM3.5 9.5v8.25c0 .966.784 1.75 1.75 1.75h13.5a1.75 1.75 0 0 0 1.75-1.75v-9A1.75 1.75 0 0 0 18.75 7h-7.19L9.72 8.841a2.25 2.25 0 0 1-1.591.659z"></path></svg>);
}

function FolderOpen(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M3.5 6.25c0-.966.784-1.75 1.75-1.75h2.88a.75.75 0 0 1 .53.22l2.06 2.06c.142.141.332.22.531.22h5.5c.967 0 1.75.784 1.75 1.75q.001.13.041.246H8.72a3.75 3.75 0 0 0-3.25 1.874L3.5 14.283zM2 17.788A3.25 3.25 0 0 0 5.25 21H11q.044 0 .086-.005h5.195a3.75 3.75 0 0 0 3.248-1.875l3.03-5.25c1.216-2.104-.225-4.72-2.602-4.868A.8.8 0 0 0 20 8.75a3.25 3.25 0 0 0-3.25-3.25h-5.19L9.72 3.659A2.25 2.25 0 0 0 8.129 3H5.25A3.25 3.25 0 0 0 2 6.25zm6.719-7.292h11.026c1.347 0 2.19 1.458 1.515 2.625l-3.03 5.25a2.25 2.25 0 0 1-1.949 1.124H5.255c-1.347 0-2.19-1.458-1.516-2.625l3.031-5.25a2.25 2.25 0 0 1 1.949-1.124"></path></svg>);
}

function ChevronDown(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M4.22 8.47a.75.75 0 0 1 1.06 0L12 15.19l6.72-6.72a.75.75 0 1 1 1.06 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L4.22 9.53a.75.75 0 0 1 0-1.06"></path></svg>);
}

function ChevronUp(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M4.22 15.53a.75.75 0 0 0 1.06 0L12 8.81l6.72 6.72a.75.75 0 1 0 1.06-1.06l-7.25-7.25a.75.75 0 0 0-1.06 0l-7.25 7.25a.75.75 0 0 0 0 1.06"></path></svg>);
}

function Square(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M3 6.25A3.25 3.25 0 0 1 6.25 3h11.5A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75zM6.25 4.5A1.75 1.75 0 0 0 4.5 6.25v11.5c0 .966.784 1.75 1.75 1.75h11.5a1.75 1.75 0 0 0 1.75-1.75V6.25a1.75 1.75 0 0 0-1.75-1.75z"></path></svg>);
}

function SquareChecked(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h11.5A3.25 3.25 0 0 0 21 17.75V6.25A3.25 3.25 0 0 0 17.75 3zM4.5 6.25c0-.966.784-1.75 1.75-1.75h11.5c.966 0 1.75.784 1.75 1.75v11.5a1.75 1.75 0 0 1-1.75 1.75H6.25a1.75 1.75 0 0 1-1.75-1.75zm12.78 3.03a.75.75 0 1 0-1.06-1.06l-6.223 6.216L7.78 12.22a.75.75 0 0 0-1.06 1.06l2.745 2.746a.75.75 0 0 0 1.06 0z"></path></svg>);
}

function Rocket(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M13.057 7.43a2.5 2.5 0 1 1 3.536 3.536a2.5 2.5 0 0 1-3.536-3.535m2.475 1.061a1 1 0 1 0-1.414 1.415a1 1 0 0 0 1.414-1.415m5.977-4.169a2.75 2.75 0 0 0-1.811-1.81l-.663-.206a6.75 6.75 0 0 0-6.773 1.674l-.996.996a3.5 3.5 0 0 0-4.57.327L5.455 6.545a.75.75 0 0 0 0 1.06l1.591 1.592l-.18.18a1.75 1.75 0 0 0 0 2.474l.496.496l-1.396.796a.75.75 0 0 0-.158 1.181l3.889 3.89a.75.75 0 0 0 1.181-.158l.798-1.395l.497.497a1.75 1.75 0 0 0 2.475 0l.177-.177l1.59 1.59a.75.75 0 0 0 1.06 0l1.242-1.243a3.5 3.5 0 0 0 .328-4.567l.998-.998a6.75 6.75 0 0 0 1.673-6.777zm-2.256-.378c.393.122.701.43.823.823l.207.665a5.25 5.25 0 0 1-1.302 5.27l-5.395 5.395a.25.25 0 0 1-.353 0l-5.307-5.306a.25.25 0 0 1 0-.354l5.397-5.396a5.25 5.25 0 0 1 5.268-1.302zm-1.289 9.897c.453.766.35 1.769-.308 2.427l-.712.712l-1.06-1.06zM7.758 6.363a2 2 0 0 1 2.428-.307l-2.08 2.08l-1.06-1.06zm2.818 9.199l-.514.897l-2.5-2.5l.898-.513zM6.69 18.394a.75.75 0 0 0-1.06-1.06l-2.476 2.474a.75.75 0 0 0 1.061 1.061zM4.745 15.39a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 0 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0m3.887 4.952a.75.75 0 1 0-1.06-1.06L6.513 20.34a.75.75 0 0 0 1.06 1.06z"></path></svg>);
}