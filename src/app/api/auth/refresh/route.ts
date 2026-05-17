import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as {
      id: string;
      role: string;
    };

    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        role: decoded.role,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "15m",
      }
    );

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return response;
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid refresh token",
      },
      { status: 401 }
    );
  }
}