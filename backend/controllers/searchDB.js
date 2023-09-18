import CountryCityState from "../models/countryCityState.js";
// Desc: search in database
// Method: GET
// Access: Public
// Path: /api/v1/search-db
const searchInDB = async (req, res) => {
  const { search } = req.query;
  const limit = req.query.limit ? req.query.limit : 20;
  const offSet = req.query.offSet ? req.query.offSet : 0;
  console.log(search);
  try {
    // do a full text search in the database

    const fullTextSearch = await CountryCityState.find(
      { $text: { $search: search } },
      { score: { $meta: "textScore" } }
    )
      .select("csc")
      .sort({ score: { $meta: "textScore" } })
      .limit(Number(limit))
      .skip(Number(offSet));

    res.status(200).json({ success: true, result: fullTextSearch });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export default searchInDB;
