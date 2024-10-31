"use client"

import { HeartIcon } from "@/components/elements/Icons";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/elements/Button";
import { useEffect, useState } from "react";
import { AllContents, fetchUserId, LikesContents } from "../../../lib/actions";

interface PostsProps {
    id: string;
    createdAt: Date;
    title: string;
    content: string;
    authorId: string;
    update: Date;
    author: {
        id: string;
        createdAt: Date;
        image: string | null;
        update: Date;
        username: string;
        bio: string | null;
    };
    likes: {
        userId: string;
    }[];
};

type PostsPropsArray = PostsProps[];

export default function MainContent() {
    const [btnState, setBtnState] = useState<string>("all");
    const [posts, setPosts] = useState<PostsPropsArray>([]);
    const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const userId = await fetchUserId();
            setUserId(userId)
        };
        fetchData();
    }, [])

    useEffect(() => {
        const sortAction = async () => {
            let posts;
            if (btnState == "all") {
                posts = await AllContents();
                setPosts(posts);
                console.log("All is called")
            } else if (btnState == "following") {
                posts = await LikesContents();
                setPosts(posts);
                console.log("following is called")
            } else {
                posts = await LikesContents();
                setPosts(posts);
                console.log("likes is called")
            }
        };
        sortAction();
    }, [btnState]);

    return (
        <div>
            <div className="absolute z-1 left-1/2 -translate-x-1/2 flex items-center h-16">
                <div className={`shadow-md rounded-3xl bg-white ${userId ? "" : "hidden"}`}>
                    <Button type="button" onClick={() => { setBtnState("all") }} className="h-10 w-24 text-lg">All</Button>
                    <Button type="button" onClick={() => { setBtnState("following") }} className="h-10 w-24 text-lg">Following</Button>
                    <Button type="button" onClick={() => { setBtnState("likes") }} className="h-10 w-24 text-lg">Likes</Button>
                </div>
            </div>
            <div className="absolute w-3/5 custom-t-144 left-1/2 -translate-x-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {posts.map((post) => {
                        return (
                            <div key={`${post.id}`} className="bg-white aspect-square rounded-xl flex flex-col pl-4 pt-4 pr-4">
                                <Link href={`blogpages/${post.id}`} className="h-[75%] border-b border-gray-700 text-2xl flex justify-center items-center">
                                    {post.title}
                                </Link>
                                <div className="h-[25%] flex items-center p-1 pl-2 gap-4 text-sm overflow-hidden break-words">
                                    <Link href={`/profile/${post.author.id}`} className="flex items-center gap-2 overflow-hidden break-words">
                                        <Image width={25} height={25} className="rounded-full" src={post.author.image ? post.author.image : ""} alt="User's profile picture" />
                                        {post.author.username}
                                    </Link>
                                    <div className="flex items-center gap-1">
                                        {post.likes.map(like => like.userId).some(user => user == userId) ? <HeartIcon className="h-4 w-4 pt-[2px] text-red-500" /> : <HeartIcon className="h-4 w-4 pt-[2px]" />}
                                        {post.likes.map(like => like.userId).length}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}