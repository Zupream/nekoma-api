const { Room, Booking, RoomImg } = require("../models");
const { Op } = require("sequelize");

exports.getAllRooms = () =>
  Room.findAll({
    include: RoomImg,
  });

exports.getSearchRooms = async (checkIn, checkOut, petNumber) => {
  //   const checkIn = new Date(checkInDate);
  //   const checkOut = new Date(checkOutDate);

  //   const unavailableRoom = await Room.findAll({
  //     include: {
  //       model: Booking,
  //       where: {
  //         [Op.or]: [
  //           {
  //             checkIn: {
  //               [Op.between]: [checkIn, checkOut],
  //             },
  //             checkOut: {
  //               [Op.between]: [checkIn, checkOut],
  //             },
  //           },
  //           {
  //             [Op.and]: [
  //               { checkIn: { [Op.lte]: checkIn } },
  //               { checkOut: { [Op.gte]: checkOut } },
  //             ],
  //           },
  //         ],
  //       },
  //     },
  //   });

  const unavailableRoom = await Room.findAll({
    include: {
      model: Booking,
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              {
                checkIn: {
                  [Op.gte]: checkIn,
                },
              },
              {
                checkIn: {
                  [Op.lt]: checkOut,
                },
              },
            ],
          },
          {
            [Op.and]: [
              {
                checkOut: {
                  [Op.gt]: checkIn,
                },
              },
              {
                checkOut: {
                  [Op.lte]: checkOut,
                },
              },
            ],
          },
          {
            [Op.and]: [
              {
                checkIn: {
                  [Op.lt]: checkOut,
                },
              },
              {
                checkOut: {
                  [Op.gt]: checkIn,
                },
              },
            ],
          },
        ],
      },
    },
  });

  //   console.log({ unavailableRoom: JSON.parse(JSON.stringify(unavailableRoom)) });
  //เอาเฉพาะไอดีของห้องที่ไม่ว่าง
  const unavailableRoomIds = unavailableRoom.map((el) => el.id);

  const availableRooms = await Room.findAll({
    where: {
      id: {
        [Op.notIn]: unavailableRoomIds,
      },
      maxPet: {
        [Op.gte]: petNumber,
      },
    },
  });

  return availableRooms;
};

exports.getRoomDetail = (roomId) =>
  Room.findOne({
    where: {
      id: roomId,
    },
    include: {
      model: RoomImg,
    },
  });
