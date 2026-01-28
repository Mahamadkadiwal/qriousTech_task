export const checkPermission = (req, res) => {
    res.status(200).json({ message: "You have permission to access this resource." });
}