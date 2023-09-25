import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  let counts = [];
  let invoicesWhere = {};
  if (session.user.role_id === 1) {
    invoicesWhere = {
      status: {
        gte: 1,
      },
    };

    const totalUsers = await prisma.users.count();

    const totalCases = await prisma.cases.count({
      where: {
        status: 1,
      },
    });

    const totalInvoices = await prisma.case_invoices.count({
            where: invoicesWhere,
          });

    const totalAttorney = await prisma.users.count({where: {role_id: 2}});
    counts = [
      {
        count: totalCases,
        label: "Total Cases",
        icon: "mdi mdi-alpha-c-circle",
      },
      { count: totalUsers, label: "Total Users", icon: "mdi mdi-account" },
      { count: totalInvoices, label: "Total Invoices", icon: "mdi mdi-receipt" },
      { count: totalAttorney, label: "Total Attorney", icon: "mdi mdi-account" },
    ];

    const recentInvoices = await prisma.case_invoices.findMany({
      where: invoicesWhere,
    });

    const recentAttorney = await prisma.users.findMany({
      where: { role_id: 2 },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
      },
    });

    return NextResponse.json({
      success: true,
      records: {
        role_id: session.user.role_id,
        counts: counts,
        recentInvoices: recentInvoices,
        recentAttorney: recentAttorney,
      },
    });
  } else if (session.user.role_id === 3) {
    invoicesWhere = {
      user_id: session.user.id,
    };
    const totalInvitations = await prisma.case_invitations.count({
      where: invoicesWhere,
    });
    const totalInvoices = await prisma.case_invoices.count({
      where: invoicesWhere,
    });

    counts = [
      ...counts,
      {
        count: totalInvitations,
        label: "Total Case Invitations",
        icon: "mdi mdi-alpha-c-circle",
      },
      {
        count: totalInvoices,
        label: "Total Invoices",
        icon: "mdi mdi-alpha-c-circle",
      },
    ];

    const recentInvoices = await prisma.case_invoices.findMany({
      where: invoicesWhere,
    });

    return NextResponse.json({
      success: true,
      records: {
        role_id: session.user.role_id,
        counts: counts,
        recentInvoices: recentInvoices,
      },
    });
  }
}
