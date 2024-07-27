"use server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPosts() {
    try {
        const posts = await prisma.post.findMany();
        console.log("getAllPosts :")
        return posts; 
    } catch (error) {
        console.error('Error retrieving posts:', error);
        return []; 
    }
}