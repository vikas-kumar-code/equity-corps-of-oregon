import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function DELETE(request, data) {

  let response = {};
  let deletedId = Number(data.params.id);
  try {
    if (deletedId) {
      const deleted = await prisma.cases.delete({
        where: {
          id: deletedId,
        },
      });
      if (deleted) {

        response.success = true;
        response.message = "Case has been deleted successfully.";
      }
    } else {
      response.error = true;
      response.message = "Record not found.";
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}

// import { NextResponse } from "next/server";
// import prisma from "@/utils/prisma";

// export async function DELETE(request, data) {
//   let response = {};
//   let deletedId = Number(data.params.id);
//   try {
//     if (deletedId) {
//       const caseDocuments = await prisma.case_documents.findMany({
//         where: {
//           case_id: deletedId,
//         },
//       });
//       const deleted = await prisma.cases.delete({
//         where: {
//           id: deletedId,
//         },
//       });
//       if (deleted) {
//         if (data?.file) {
//           let path = data?.path
//             ? common.publicPath(data?.path + "/" + data?.file)
//             : common.publicPath("temp/" + data?.file); // default delete path
//           if (existsSync(path)) {
//             unlinkSync(path);
//           }
//         }

//         response.success = true;
//         response.message = "Case has been deleted successfully.";
//       }
//     } else {
//       response.error = true;
//       response.message = "Record not found.";
//     }
//   } catch (error) {
//     response.error = true;
//     response.message = error.message;
//   }
//   return NextResponse.json(response);
// }


