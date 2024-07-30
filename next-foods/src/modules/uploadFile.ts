"use server";
import { promises as fs } from "node:fs";
import { resolve } from "node:path";
import crypto from "node:crypto";

export async function uploadFile(formData: FormData): Promise<string> {
    const file = formData.get("file") as File;
    if (file && file.size > 0) {
        const data = await file.arrayBuffer();
        const buffer = Buffer.from(data);
        const fileExtension = file.name.split(".").pop(); // ファイルの拡張子を取得
        const fileName = `${crypto.randomUUID()}.${fileExtension}`; // ファイル名を生成
        const filePath = resolve(
            process.cwd(),
            "./public/images",
            fileName
        );
        await fs.writeFile(filePath, buffer);
        return fileName; // ファイルのフルパスからファイル名のみを返す
    }
    return "";
}
