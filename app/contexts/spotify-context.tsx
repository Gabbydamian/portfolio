// "use client";

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
//   useRef,
// } from "react";
// import { Howl, Howler } from "howler";

// interface Track {
//   title: string;
//   artist: string;
//   audio: string;
//   cover: string;
// }

// interface SpotifyContextType {
//   isPlaying: boolean;
//   isMuted: boolean;
//   currentTrack: Track;
//   togglePlay: () => void;
//   toggleMute: () => void;
//   volume: number;
//   setVolume: (volume: number) => void;
// }

// const tracks: Track[] = [
//   {
//     title: "Rainy Lofi City",
//     artist: "Pixabay Music",
//     audio:
//       // "https://vkzysblijnkwykumefrg.supabase.co/storage/v1/object/public/music//lofi.mp3",
//       "",
//     cover:
//       "https://th.bing.com/th/id/R.4a98ce482bd7504e34e999724f1b8f93?rik=9ITkpQqZ4AnWqw&pid=ImgRaw&r=0",
//   },
// ];

// const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);

// export function SpotifyProvider({ children }: { children: ReactNode }) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [volume, setVolume] = useState(0.3);
//   const [currentTrack, setCurrentTrack] = useState(tracks[0]);
//   const soundRef = useRef<Howl | null>(null);

//   // Initialize audio on mount
//   useEffect(() => {
//     const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
//     setCurrentTrack(randomTrack);

//     soundRef.current = new Howl({
//       src: [randomTrack.audio],
//       html5: true,
//       volume: volume,
//       loop: true,
//       autoplay: true,
//       onload: () => {
//         // Start playing once loaded
//         soundRef.current?.play();
//         setIsPlaying(true);
//       },
//     });

//     // Cleanup on unmount
//     return () => {
//       soundRef.current?.unload();
//     };
//   }, []);

//   // Handle play/pause
//   useEffect(() => {
//     const sound = soundRef.current;
//     if (!sound) return;

//     if (isPlaying) {
//       sound.play();
//     } else {
//       sound.pause();
//     }
//   }, [isPlaying]);

//   // Handle mute/unmute
//   useEffect(() => {
//     Howler.mute(isMuted);
//   }, [isMuted]);

//   // Handle volume changes
//   useEffect(() => {
//     if (soundRef.current) {
//       soundRef.current.volume(volume);
//     }
//   }, [volume]);

//   const togglePlay = () => {
//     setIsPlaying((prev) => !prev);
//   };

//   const toggleMute = () => {
//     setIsMuted((prev) => !prev);
//   };

//   return (
//     <SpotifyContext.Provider
//       value={{
//         isPlaying,
//         isMuted,
//         currentTrack,
//         togglePlay,
//         toggleMute,
//         volume,
//         setVolume,
//       }}
//     >
//       {children}
//     </SpotifyContext.Provider>
//   );
// }

// export function useSpotify() {
//   const context = useContext(SpotifyContext);
//   if (context === undefined) {
//     throw new Error("useSpotify must be used within a SpotifyProvider");
//   }
//   return context;
// }
