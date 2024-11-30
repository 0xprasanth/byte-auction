import { type NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { nanoid } from "nanoid";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const uid = nanoid(14);

  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${uid}_${file.name.replaceAll(" ", "_")}`;
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer,
    );
    console.log(`uploaded ${filename}`);

    return NextResponse.json({
      Message: "Success",
      status: 201,
      fileName: `${filename}`,
    });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
