import { SignedOut, UserButton } from "@clerk/clerk-react";
import { ShieldUser  } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
	import { useAuthStore } from "@/stores/useAuthStore";
const Topbar = () => {
	const isAdmin  = useAuthStore();
	console.log({ isAdmin });

	return (
		<div
			className='flex items-center justify-between p-4 sticky top-0 bg-purple-900 
      backdrop-blur-md z-10
    '
		>
			<div className='flex gap-2 items-center text-white font-bold text-xl'>
				{ <img src='/melodylogo.jpg' className='size-9 rounded-4xl' /> }
				MelodyHub
			</div>
			<div className='flex items-center gap-4'>
				
				<SignedOut>
					<SignInOAuthButtons />
				</SignedOut>

				<UserButton />
			</div>
		</div>
	);
};
export default Topbar;
