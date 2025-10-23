import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
	return (
		<section
			className="h-[70vh] bg-fixed bg-center bg-cover flex flex-col lg:flex-row justify-end text-foreground text-4xl hero-bg"
			style={{
				backgroundImage: `url('/hero-pattern.png')`, // ✅ Direct path from public/
			}}
		>
			<div className="bg-background w-full lg:w-[75vw] diagonal-left-clip flex flex-col justify-center h-[55vh] lg:h-full px-8 lg:pl-72 slide-in-left">
				<h1 className="font-din-condensed font-thin text-3xl md:text-[52px] leading-[58px] tracking-[0.15em]">
					MUMWELL <br /> SUPPORT FOR MOTHERS
				</h1>
				<div className="bg-gradient-to-r from-primary via-primary/90 to-secondary h-2 w-18 my-4" />
				<p className="max-w-sm text-lg md:text-xl font-bold mt-4">
					Because a mother’s well-being matters. Get early screening, counseling, and care all in one place.
				</p>
				<button className="mt-6 flex self-start text-base md:text-xl items-center gap-2 group bg-primary py-2 px-2 rounded-md text-white">
					
					<Link href="/signup">

						GET STARTED{' '}
					</Link>
					<ArrowRight
						size={20}
						className="group-hover:translate-x-1 transition-transform duration-300"
					/>
				</button>
			</div>
		</section>
	);
};

