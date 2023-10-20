import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getSession } from "@/utils/serverHelpers";

export async function GET(request) {
  const session = await getSession();
  const response = {};
  try {
    // Admin dashboard data
    if (session.user.role_id === 1) {
      response.counts = [
        {
          count: await prisma.cases.count(),
          label: "Total Case",
          icon: "mdi mdi-alpha-c-circle",
        },
        {
          count: await prisma.users.count(),
          label: "Total User",
          icon: "mdi mdi-account",
        },
        {
          count: await prisma.case_invoices.count({
            where: {
              status: {
                gte: 1,
              },
            },
          }),
          label: "Total Invoice",
          icon: "mdi mdi-receipt",
        },
        {
          count: await prisma.users.count({ where: { role_id: 2 } }),
          label: "Total Attorney",
          icon: "mdi mdi-account",
        },
      ];

      response.recentInvoices = await prisma.case_invoices.findMany({
        where: {
          status: {
            gte: 1,
          },
        },
        orderBy: [{ id: "desc" }],
        take: 5,
      });

      response.recentAttorney = await prisma.users.findMany({
        where: { role_id: 2 },
        take: 5,
        orderBy: [{ id: "desc" }],
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
        records: response,
      });

      // Eco provider dashboard data
    } 
    // else if (session.user.role_id === 3) {
    //   let where = {
    //     user_id: session.user.id,
    //   };

    //   response.counts = [
    //     {
    //       count: await prisma.case_invitations.count({ where }),
    //       label: "Total Case Invitation",
    //       icon: "mdi mdi-alpha-c-circle",
    //     },
    //     {
    //       count: await prisma.case_invoices.count({ where }),
    //       label: "Total Invoice",
    //       icon: "mdi mdi-receipt",
    //     },
    //   ];

    //   response.recentInvoices = await prisma.case_invoices.findMany({
    //     where,
    //     orderBy: [{ id: "desc" }],
    //     take: 5,
    //   });

    //   response.recentCaseInvitations = await prisma.case_invitations.findMany({
    //     where,
    //     orderBy: [{ id: "desc" }],
    //     include: { case: true },
    //     take: 5,
    //   });

    //   return NextResponse.json({
    //     success: true,
    //     records: response,
    //   });
    // }
  } catch (err) {
    return NextResponse.json({
      error: true,
      message: err.message,
    });
  }
  // counts = [
  //   ...counts,
  //   { count: totalInvitations, label: 'Total Case Invitations', icon: 'mdi mdi-alpha-c-circle' },
  // ]
  return NextResponse.json({
    success: true,
    records: {
      counts: counts
    }
  });
}