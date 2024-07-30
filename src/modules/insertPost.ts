"use server";

import type { Post } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function insertPost(postData: Post) {
    const { name, content, imagePath, date } = postData;
    var toString = Object.prototype.toString
    console.log("#################")
    console.log(toString.call(date))
    console.log("#################")
    try {
        const response = await prisma.post.create({
            data: {
                name,
                content: content,
                imagePath: "/images/" + imagePath,
                date
            }
        });
    } catch (error) {
        console.error('Error creating post:', error);
    }
}
