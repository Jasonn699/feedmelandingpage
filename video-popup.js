/**
 * Video Popup Modal Functionality
 * Handles opening and closing of YouTube video in a modal popup
 */

(function () {
  "use strict";

  // Configuration - Replace with your YouTube video IDs for each language
  const YOUTUBE_VIDEO_IDS = {
    en: "E9V0V1cssvg", // Replace with your English video ID
    bm: "E9V0V1cssvg", // Replace with your Bahasa Malaysia video ID
    zh: "vgyc6YyDIOc", // Replace with your Chinese video ID
  };

  // DOM elements
  let demoNavLink;
  let videoModal;
  let videoIframe;
  let closeButton;

  // Initialize the video popup functionality
  function init() {
    // Get DOM elements
    demoNavLink = document.getElementById("demo-nav-link");
    videoModal = document.getElementById("video-popup-modal");
    videoIframe = document.getElementById("demo-video-iframe");
    closeButton = videoModal?.querySelector(".video-modal-close");

    if (!demoNavLink || !videoModal || !videoIframe) {
      console.warn("Video popup elements not found");
      return;
    }

    // Add event listeners
    setupEventListeners();
  }

  // Set up all event listeners
  function setupEventListeners() {
    // Open video modal when demo nav link is clicked
    demoNavLink.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default link behavior
      openVideoModal();
    });

    // Close modal when close button is clicked
    if (closeButton) {
      closeButton.addEventListener("click", closeVideoModal);
    }

    // Close modal when clicking outside the video
    videoModal.addEventListener("click", function (e) {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && videoModal.classList.contains("show")) {
        closeVideoModal();
      }
    });

    // Handle window resize to maintain responsive video
    window.addEventListener("resize", handleResize);
  }

  // Get current language from the language selector
  function getCurrentLanguage() {
    const langSelect = document.getElementById("lang-select");
    return langSelect ? langSelect.value : "en"; // Default to English
  }

  // Get the appropriate video ID based on current language
  function getCurrentVideoId() {
    const currentLang = getCurrentLanguage();
    return YOUTUBE_VIDEO_IDS[currentLang] || YOUTUBE_VIDEO_IDS.en; // Fallback to English
  }

  // Open the video modal
  function openVideoModal() {
    if (!videoModal || !videoIframe) return;

    // Get the video ID for the current language
    const videoId = getCurrentVideoId();

    // Build YouTube embed URL with autoplay
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`;

    // Set the iframe source
    videoIframe.src = embedUrl;

    // Show the modal
    videoModal.classList.add("show");
    videoModal.style.display = "flex";

    // Prevent body scrolling
    document.body.style.overflow = "hidden";

    // Focus management for accessibility
    videoModal.focus();

    // Track analytics if needed
    trackVideoOpen();
  }

  // Close the video modal
  function closeVideoModal() {
    if (!videoModal || !videoIframe) return;

    // Hide the modal
    videoModal.classList.remove("show");

    // Use setTimeout to allow animation to complete
    setTimeout(() => {
      videoModal.style.display = "none";
      // Stop the video by clearing the iframe source
      videoIframe.src = "";
    }, 300);

    // Restore body scrolling
    document.body.style.overflow = "";

    // Return focus to the demo nav link
    if (demoNavLink) {
      demoNavLink.focus();
    }

    // Track analytics if needed
    trackVideoClose();
  }

  // Handle window resize
  function handleResize() {
    // Add any resize-specific logic here if needed
    // The CSS handles most of the responsive behavior
  }

  // Analytics tracking functions (optional)
  function trackVideoOpen() {
    // Add your analytics tracking code here
    // Example: gtag('event', 'video_play', { video_title: 'FeedMe POS Demo' });
    console.log("Video opened - tracking event");
  }

  function trackVideoClose() {
    // Add your analytics tracking code here
    // Example: gtag('event', 'video_close', { video_title: 'FeedMe POS Demo' });
    console.log("Video closed - tracking event");
  }

  // Utility function to change video ID for a specific language
  function setVideoId(language, newVideoId) {
    if (
      typeof language === "string" &&
      typeof newVideoId === "string" &&
      newVideoId.length > 0
    ) {
      YOUTUBE_VIDEO_IDS[language] = newVideoId;
      console.log(`Video ID for ${language} updated to:`, newVideoId);
    }
  }

  // Utility function to set all video IDs at once
  function setAllVideoIds(videoIds) {
    if (typeof videoIds === "object" && videoIds !== null) {
      Object.assign(YOUTUBE_VIDEO_IDS, videoIds);
      console.log("All video IDs updated:", YOUTUBE_VIDEO_IDS);
    }
  }

  // Public API
  window.VideoPopup = {
    init: init,
    open: openVideoModal,
    close: closeVideoModal,
    setVideoId: setVideoId,
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
