import Bicycle from "../model/bicycle.js";

//API
// Get all bicycles
export const getAllBicycles = async (req, res) => {
  try {
    const bicycleData = await Bicycle.find();
    if (!bicycleData) {
      return res.json({ message: "Нет созданных велосипедов" });
    }
    res.json(bicycleData);
  } catch (error) {
    return res.json({ message: "Нет данных" });
  }
};

// Create bicycle
export const createBicycle = async (req, res) => {
  try {
    const { name, type, color, wheel_size, price, description, _id, status } =
      req.body;

    const newBicycle = new Bicycle({ ...req.body });
    await newBicycle.save();
    res.json({ message: "Добавлен новый велосипед" });
  } catch (err) {
    if (err.message.indexOf('Cast to ObjectId failed')) {
      return res.json({message: "Велосипед с таким ID уже существует"});
    }
    return res.json({ message: "Ошибка! Новый велосипед не создан" });
  }
};

// Edit bicycle
export const editBicycle = async (req, res) => {
  try {
    const id = req.params.id;
    const bicycleExist = await Bicycle.findById(id);
    if (!bicycleExist) {
      return res.json({ message: "Такого велосипеда нет в базе" });
    }
    const updatedData = await Bicycle.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ message: "У велосипеда изменен статус" });
  } catch (err) {
    res.json({ message: "Редактирование не возможно" });
  }
};

// Delete bicycle
export const deleteBicycle = async (req, res) => {
  try {
    const id = req.params.id;
    const bicycleExist = await Bicycle.findById(id);
    if (!bicycleExist) {
      return res.json({ message: "Такого велосипеда нет в базе" });
    }
    await Bicycle.findByIdAndDelete(id);
    res.json({ message: "Велосипед удален из базы" });
  } catch (err) {
    res.json({ message: "Удаление не возможно" });
  }
};

// total bikes, available bikes, booked bikes, average bike's cost UAH/hr.
export const statistics = async (req, res) => {
  try {
    const bicycleData = await Bicycle.find();
    if (!bicycleData) {
      return res.json({ message: "Нет созданных велосипедов" });
    }
    const quantity = bicycleData.length;
    const availableBikes = bicycleData.filter(
      (bike) => bike.status === "Available"
    ).length;
    const bookedBikes = quantity - availableBikes;
    const costBike = bicycleData.reduce((sum, bike) => sum + bike.price, 0);
    const avrCostBike = (costBike / quantity).toFixed(2);
    const result = {
      quantity,
      availableBikes,
      bookedBikes,
      avrCostBike,
    };
    res.json(result);
  } catch (error) {
    return res.json({ message: "Нет данных" });
  }
};
