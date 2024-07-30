"use server";
import { PrismaClient } from '@prisma/client';
import { Post } from './post';

const prisma = new PrismaClient();

export async function insertPost(postData: Post) {
    const { name, content, imageName, date } = postData;
    var toString = Object.prototype.toString
    console.log("#################")
    console.log(toString.call(date))
    console.log("#################")
    try {
        const response = await prisma.post.create({
            data: {
                name,
                content: content,
                imagePath: "/images/" + imageName,
                date
            }
        });
    } catch (error) {
        console.error('Error creating post:', error);
    }
}
