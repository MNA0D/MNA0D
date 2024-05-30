import { Request, Response } from 'express';
import Toast from '../../../../mongo/models/toast';

export default {
    handle: "/delete-toast",
    method: "DELETE",
    description: "Route de suppression de notification",
    route: async (req: Request, res: Response) => {
        try {
            if (!res.locals.auth || !res.locals.auth.cookie.auth) return res.status(401).json({ success: false, message: 'No token provided' });
            if (!res.locals.auth.user) return res.status(404).json({ success: false, error: "User not found" });

            const { toastId } = req.body;
            if (!toastId) return res.status(400).json({ success: false, error: "No toast ID provided" });

            const toast = await Toast.findByIdAndDelete(toastId).catch(() => null);
            if (!toast) return res.status(404).json({ success: false, error: "Toast not found" });

            res.status(200).json({ success: true, message: "Toast deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while deleting the toast" });
        }
    }
};
