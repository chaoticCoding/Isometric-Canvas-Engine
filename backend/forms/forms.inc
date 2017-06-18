<?php
/**
 * Created by PhpStorm.
 * User: shawn
 * Date: 10/23/14
 * Time: 11:23 PM
 *
 * TODO
 * NOTES:
 * static class, when forms are rendered it stores input types in the active session,
 * this is used to prevent form overloading and duplicate submissions as once a form is submit it blocks all future submissions
 */

class forms {

	/** TODO
	 * Takes form data and renders it by weight
	 *
	 * @param array $formData
	 *
	 * @return html of form created
	 */
	public static function render(array $formData){

		return $renderedTML;

	}

	/** TODO
	 * takes submitted form data and validates it based on the pre rendered form
	 *
	 * @param $formID
	 * @param array $formData
	 */
	public static function submit($formID, array $formData){

	}

	/** TODO
	 *
	 * @param $formID
	 * @param array $formData
	 */
	public static function validate($formID, array $formData){

	}
}