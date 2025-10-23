import Hero from "@/components/aboutPageComponents/Hero";

export default function AboutMumWell() {
	return (
		<>
			<Hero title='About MumWell' />
			<section className='max-w-5xl mx-auto px-6 md:px-0 py-10 pb-2 flex flex-col space-y-10'>

				{/* Introduction */}
				<p className='text-lg md:text-xl font-normal leading-7 text-foreground'>
					MumWell is a maternal mental health platform dedicated to supporting mothers
					experiencing postpartum depression and other mental health challenges. We combine
					AI-powered screenings, empathetic chat support, and professional counseling to
					ensure mothers get the care they need.
				</p>

				{/* Mission */}
				<div className='flex flex-col space-y-2'>
					<h2 className='text-foreground font-bold text-xl md:text-2xl leading-6.5'>
						Our Mission
					</h2>
					<p className='text-foreground text-lg md:text-xl font-normal leading-7'>
						To provide accessible, empathetic, and evidence-based support for maternal
						mental health, empowering mothers to thrive during and after the postpartum period.
					</p>
				</div>

				{/* Vision */}
				<div className='flex flex-col space-y-2'>
					<h2 className='text-foreground font-bold text-xl md:text-2xl leading-6.5'>
						Our Vision
					</h2>
					<p className='text-foreground text-lg md:text-xl font-normal leading-7'>
						A world where every mother receives timely mental health support, feels
						understood, and is equipped to nurture herself and her child.
					</p>
				</div>

				{/* Why Maternal Mental Health Matters */}
				<div className='flex flex-col space-y-2'>
					<h2 className='text-foreground font-bold text-xl md:text-2xl leading-6.5'>
						Why Maternal Mental Health Matters
					</h2>
					<p className='text-foreground text-lg md:text-xl font-normal leading-7'>
						Postpartum depression affects 1 in 5 mothers globally. Early detection and
						support not only improve maternal well-being but also enhance child health
						and family stability. MumWell bridges the gap between mothers and timely,
						quality care.
					</p>
				</div>

				{/* How We Help */}
				<div className='flex flex-col space-y-1'>
					<h2 className='text-foreground font-bold text-xl md:text-2xl leading-6.5'>
						How We Help
					</h2>
					<p className='text-foreground text-lg md:text-xl font-normal leading-7'>
						Through our platform, mothers can complete AI-powered screenings to assess
						their mental health risk, chat with our AI assistant for guidance, and get
						matched with professional counselors for personalized support. All interactions
						are secure and confidential.
					</p>
				</div>

				{/* Societal Impact */}
				<div className='flex flex-col space-y-1'>
					<h2 className='text-foreground font-bold text-xl md:text-2xl leading-6.5'>
						Societal Impact
					</h2>
					<p className='text-foreground text-lg md:text-xl font-normal leading-7'>
						MumWell collaborates with NGOs, healthcare providers, and community organizations
						to reach mothers who need help the most, creating measurable improvements in
						maternal mental health and family well-being across communities.
					</p>
				</div>

			</section>
		</>
	);
};
