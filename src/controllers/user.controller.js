import { UserDAO } from "../daos/user.dao.js";
import { jwtSign } from "../utils/jwt.utils.js";
import { stringIsFilled } from "../utils/string.utils.js";
import { passwordIsValid, emailIsValid } from "../utils/regex.utils.js";
import bcrypt from "bcrypt";

// S'enregistrer
const signUp = async (req, res) => {
	try {
		const {
			lastname,
			firstname,
			pseudo,
			email,
			password,
			salary,
			user_saving,
			user_img,
			author_id,
		} = req.body;
		console.log(req.body);
		const isEmailValid = emailIsValid(email);
		const isPasswordValid = passwordIsValid(password);
		if (!isEmailValid || !isPasswordValid) {
			return res
				.status(400)
				.json({ message: "Email ou mot de passe invalide." });
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
		if (!hashedPassword) {
			return res.status(401).json({ message: "Mot de passe incorrect." });
		}

		const existingUser = await UserDAO.readUserByEmail(email);
		if (existingUser) {
			return res.status(403).json({ message: "Email déjà existant" });
		}

		const existingPseudo = await UserDAO.readUserByPseudo(pseudo);
		if (existingPseudo) {
			return res.status(403).json({ message: "Pseudo déjà existant" });
		}
		const decodeduser_img = user_img.replaceAll("&#x2F;", "/");
		const decodedLastname = lastname.replaceAll("&#x27;", "'");
		const decodedFirstname = firstname.replaceAll("&#x27;", "'");
		const decodedPseudo = pseudo.replaceAll("&#x27;", "'");
		console.log(decodeduser_img);
		const user = await UserDAO.createUser(
			decodedLastname,
			decodedFirstname,
			decodedPseudo,
			email,
			hashedPassword,
			salary,
			user_saving,
			decodeduser_img,
			author_id
		);

		if (user.error) {
			return res.status(403).json({ message: user.error });
		}
		res.status(201).json({
			message: "Utilisateur créé avec succès.",
			user,
		});
	} catch (error) {
		console.error(`Erreur lors de la création de l'utilisateur : ${error}`);
		res.status(500).json({
			message: `Erreur lors de la création de l'utilisateur : ${error}`,
		});
	}
};

// Se connecter
const signIn = async (req, res) => {
	const { email, password } = req.body;

	if (!stringIsFilled(email) || !stringIsFilled(password)) {
		return res.status(400).json({
			message: "Veuillez entrer un email et un mot de passe valides.",
		});
	}

	try {
		const user = await UserDAO.readUserByEmail(email);
		if (!user) {
			return res.status(404).json({ message: "Utilisateur non trouvé." });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(404).json({ message: "Mot de passe incorrect." });
		} else {
			const token = jwtSign(user.id);
			console.log(`Token généré lors de la connexion : ${token}`);

			res.status(200).json({
				message: "Connexion réussie.",
				token,
				user,
			});
		}
	} catch (error) {
		console.error(`Erreur lors de la connexion de l'utilisateur : ${error}`);
		res.status(500).json({
			message: `Erreur lors de la connexion de l'utilisateur : ${error.message}`,
		});
	}
};
// Afficher les users
const getAllUsers = async (req, res) => {
	const { token, userId } = req.body;
	console.log(token);
	try {
		const users = await UserDAO.readAllUsers();
		res.status(200).json({ users });
	} catch (error) {
		console.error(`Erreur lors de la récupération des utilisateurs : ${error}`);
		res.status(500).json({
			message: `Erreur lors de la récupération des utilisateurs : ${error.message}`,
		});
	}
};
// Afficher les informations d'un utilisateur
const getUserInfos = async (req, res) => {
	const id = req.params.id;

	try {
		const user = await UserDAO.readById(id);

		if (!user) {
			return res.status(404).json({ message: "Utilisateur non trouvé." });
		}

		const token = jwtSign(user.id);
		console.log(`Token généré pour l'utilisateur : ${token}`);

		res.status(200).json({ user });
	} catch (error) {
		console.error(
			`Erreur lors de la récupération des informations de l'utilisateur : ${error}`
		);
		res.status(500).json({
			message: `Erreur lors de la récupération des informations de l'utilisateur : ${error.message}`,
		});
	}
};

// checker l'accés via un token
const checkToken = async (req, res) => {
	const { token, userId } = req.body;
	try {
		const user = await UserDAO.readById(userId);
		if (!user) {
			return res.status(404).json({ message: "Utilisateur non trouvé." });
		}
		res.status(200).json({ token, user });
	} catch (error) {
		console.error(
			`Erreur lors de la récupération des informations de l'utilisateur : ${error}`
		);
		res.status(500).json({
			message: `Erreur lors de la récupération des informations de l'utilisateur : ${error.message}`,
		});
	}
};

// modifier un user
const updateUser = async (req, res) => {
	try {
		const {
			lastname,
			firstname,
			pseudo,
			email,
			salary,
			user_saving,
			user_img,
		} = req.body;
		const id = req.params.id;
		if (!stringIsFilled(email)) {
			res.status(400).json({ message: `Email ou mot de passe incorrect` });
			return;
		}
		const decodeduser_img = user_img.replaceAll("&#x2F;", "/");
		const decodedLastname = lastname.replaceAll("&#x27;", "'");
		const decodedFirstname = firstname.replaceAll("&#x27;", "'");
		const decodedPseudo = pseudo.replaceAll("&#x27;", "'");
		console.log(decodeduser_img);
		const user = await UserDAO.updateUser(
			id,
			decodedLastname,
			decodedFirstname,
			decodedPseudo,
			email,
			salary,
			user_saving,
			decodeduser_img
		);

		if (!user) {
			res
				.status(404)
				.json({ message: `Impossible de retrouver l'utilisateur` });
			return;
		}

		return res
			.status(200)
			.json({ message: "Utilisateur modifié avec succès", user });
	} catch (error) {
		console.error(
			`Erreur lors de la mise à jour des informations de l'utilisateur : ${error}`
		);
		return res.status(500).json({
			message: `Erreur lors de la mise à jour des informations de l'utilisateur : ${error.message}`,
		});
	}
};

// supprimer un user
const deleteUser = async (req, res) => {
	try {
		const { token, userId } = req.body;
		const user = await UserDAO.deleteUser(userId);
		if (!user) {
			res
				.status(404)
				.json({ message: `Impossible de retrouver l'utilisateur` });
			return;
		}
		return res
			.status(200)
			.json({ message: "Utilisateur supprimé avec succès" });
	} catch (error) {
		console.error(`Erreur lors de la suppression de l'utilisateur : ${error}`);
		return res.status(500).json({
			message: `Erreur lors de la suppression de l'utilisateur : ${error.message}`,
		});
	}
};

export const UserController = {
	signUp,
	signIn,
	checkToken,
	getAllUsers,
	getUserInfos,
	updateUser,
	deleteUser,
};
