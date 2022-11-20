Table user {
  id text
  username text
  password text
}

Table service {
  id int [pk, increment]
  userId int [ref: > user.id]
  title text
}

Table serviceField {
  id int [pk, increment]
  serviceId int [ref: > service.id]
  key text
  value text
}

Table profileField {
  id int [pk, increment]
  profileId int [ref: > profile.id]
  key text
  value text
}

Table serviceTag {
  id int [pk, increment]
  serviceId int [ref: > service.id]
  tagId int [ref: > tag.id]
}

Table tag {
  id int [pk, increment]
  title string
}

Table profile {
  id int [pk, increment]
  serviceId int [ref: > service.id]
  userId int [ref: > user.id]
  title text
}


// Table userFacility {
//   id int [pk, increment]
//   userId int [ref: > user.id]
//   facilityId int [ref: > facility.id]
//   role text
// }

// Table facility {
//   id int
//   locationId int [ref: > location.id]
//   name text
// }

// Table facilityItem {
//   id int [pk, increment]
//   userId text [ref: > user.id]
//   facilityId int [ref: > facility.id]
//   itemId int [ref: > item.id]
//   quantity int
// }

// Table item {
//   id int [pk, increment]
//   manufacturerId int [ref: > manufacturer.id]
//   name text
//   msrp int
// }

// Table itemVendor {
//   id int [pk, increment]
//   itemId int [ref: > item.id]
//   vendorId int [ref: > vendor.id]
//   price int
// }

// Table vendor {
//   id int [pk, increment]
//   retailerId int [ref: > retailer.id]
//   locationId int [ref: > location.id]
// }

// Table location {
//   id int [pk, increment]
//   country text
//   city text
//   address text
//   coordinates text
// }

// Table retailer {
//   id int [pk, increment]
//   locationId int [ref: > location.id]
//   name text
// }

// Table manufacturer {
//   id int [pk, increment]
//   locationId int [ref: > location.id]
//   name text
// }
