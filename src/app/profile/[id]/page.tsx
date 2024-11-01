import prisma from "../../../../lib/prisma";
import ProfileLayout from "@/components/features/ProfileLayout";

interface Params {
    id: string;
}

export default async function Profile({ params }: { params: Params }) {
    let posts = [];

    posts = await prisma.user.findMany({
        where: {
            id: {
                in: [params.id]
            }
        },
        include: {
            posts: {
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    likes: {
                        select: {
                            userId: true,
                        }
                    }
                },
            },
            followers: {
                select: {
                    followerId: true,
                }
            },
            following: {
                select: {
                    followingId: true,
                }
            },
            likes: {
                select: {
                    userId: true,
                }
            }
        },
    })

    return (
        <div >
            <ProfileLayout data={posts} />
        </div>
    );
}