import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

import { buildRaporData } from "@/lib/rapor/buildData";
import { raporTemplate } from "@/lib/rapor/template";

export async function POST(req) {
  try {
    console.log("=== GENERATE RAPOR START ===");

    const body = await req.json();
    console.log("BODY:", body);

    const { nisn, id_tahun_ajaran, semester } = body;

    const data = await buildRaporData({
      nisn,
      id_tahun_ajaran,
      semester
    });

    console.log("DATA RAPOR OK");

    const html = raporTemplate(data);
    console.log("HTML GENERATED");

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
  width: "21.59cm",
  height: "35.56cm",
  margin: {
    top: "9mm",
    bottom: "4mm",
    left: "8mm",
    right: "3mm"
  }
});

    await browser.close();
    console.log("PDF GENERATED");

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="rapor-${nisn}.pdf"`
      }
    });

  } catch (err) {
    console.error("🔥 ERROR GENERATE RAPOR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
