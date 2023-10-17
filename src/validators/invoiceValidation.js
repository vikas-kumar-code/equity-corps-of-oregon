export default function invoiceValidation(fields, hourly_rate = false) {
  let errs = {};
  if (!fields?.due_on) {
    errs.due_on = "Due on is required.";
  }
  fields.particulars.forEach((item, index) => {
    if (!item?.show_other_category && !item?.category?.value) {
      errs["particulars" + index + "category"] = "Select a valid category.";
    }
    if (item?.show_other_category && !item?.other_category) {
      errs["particulars" + index + "other_category"] =
        "Category can not be blank.";
    }
    if (!item?.short_description) {
      errs["particulars" + index + "short_description"] = "Short description can not be blank.";
    }
    if (!item?.amount) {
      errs["particulars" + index + "amount"] = "Amount can not be blank.";
    }
    if (hourly_rate && !item.hours_worked) {
      errs["particulars" + index + "hours_worked"] =
        "Hours worked can not be blank.";
    }
  });
  if (Object.entries(errs).length > 0) {
    return {
      error: Object.entries(errs).length > 0,
      messages: errs,
    };
  } else {
    return fields;
  }
}
