// Desc: search in database
// Method: GET
// Access: Public
// Path: /api/v1/search-db
const searchInDB = async (req, res) => {
  const { search } = req.query;
  const limit = req.query.limit ? req.query.limit : 15;
  const offSet = req.query.offSet ? req.query.offSet : 0;
  console.log(search);
  try {
    // if search lenght is less than 3 characters return

    if (search.length < 4) {
      return res.status(400).json({
        success: false,
        message: "Search length must be greater than 3 characters",
      });
    }

    // do a full text search in the database

    const fullTextSearch = await CountryCityState.find(
      { $text: { $search: search } }
      // { score: { $meta: "textScore" } }
    )
      .select("csc")
      .limit(Number(limit))
      .skip(Number(offSet));

    // do regex search in the database

    const regex = new RegExp(`${search}`, "gi");
    const autocompleteCSCQuery = CountryCityState.find({
      $or: [{ csc: { $regex: regex } }],
    })
      .select("csc")
      .limit(Number(limit))
      .skip(Number(offSet));

    const [fulltextsearch, autocompletecscquery] = await Promise.all([
      fullTextSearch,
      autocompleteCSCQuery,
    ]);

    let cscIds = fullTextSearch.map((csc) => csc._id.toString());
    let filteredAutoCompleteSearchQuery = autocompletecscquery.filter(
      (csc) => !cscIds.includes(csc._id.toString())
    );

    res.status(200).json({
      success: true,
      results: [...fulltextsearch, ...filteredAutoCompleteSearchQuery],
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export default searchInDB;
