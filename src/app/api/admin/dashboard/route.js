import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  let counts = [];
  const totalUsers = await prisma.users.count();


  const totalCases = await prisma.cases.count({
    where: {
      status: 1
    }
  });
  counts = [
    { count: totalCases, label: 'Total Cases', icon: 'mdi mdi-alpha-c-circle' },
    { count: totalUsers, label: 'Total Users', icon: 'mdi mdi-account' },
  ];

  if (session.user.role_id === 3) {
    const totalInvitations = await prisma.case_invitations.count({
      where: {
        user_id: session.user.id,
      }
    });
    counts = [
      ...counts,
      { count: totalInvitations, label: 'Total Case Invitations', icon: 'mdi mdi-alpha-c-circle' },
    ]
  }

  return NextResponse.json({
    success: true,
    records: {
      counts: counts
    }
  });
}