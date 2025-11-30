import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex  flex-col md:p-5 items-center justify-center bg-[#0a0e17] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[100px]" />

            {/* <div className="z-10 mb-6">
                <Link href="/">
                    <ApplicationLogo className="h-24 w-24 fill-current text-white" />
                </Link>
            </div> */}

            <div className="z-10 p-5 w-full overflow-hidden bg-[#1f2937]/60 backdrop-blur-lg border border-white/5 px-8 py-10 shadow-2xl sm:max-w-md sm:rounded-2xl">
                {children}
            </div>
        </div>
    );
}
