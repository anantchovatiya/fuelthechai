import { ShareIcon } from "lucide-react";

export default function Share() {
  const handleShare = async () => {
    const currentUrl = window.location.href; // Get the current URL

    // Check if the Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title, // Page title
          text: "Fuel the chai by donating!",
          url: currentUrl, // Page URL
        });
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      alert("Sorry, your browser does not support the Share API.");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center px-4 py-2 text-white bg-slate-600 hover:bg-blue-700 rounded-lg"
    >
      <ShareIcon className="w-5 h-5 mr-2" />
      Share to get more chais 🍵
    </button>
  );
}
