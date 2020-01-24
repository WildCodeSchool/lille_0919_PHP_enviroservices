<?php


namespace App\Controller;

use App\Entity\Collects;
use App\Entity\Estimations;
use App\Entity\User;
use App\Form\UserType;
use App\Repository\CollectsRepository;
use App\Repository\OrganismsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use DateTime;

class UserController extends AbstractController
{
    /**
     * @Route("/user/add/{estimation}", name="user_add")
     * @param Request $request
     * @param Estimations $estimation
     * @param EntityManagerInterface $em
     * @return Response
     * @throws Exception
     */
    public function newUser(
        Request $request,
        Estimations $estimation,
        EntityManagerInterface $em
    ): Response {

        $user = new User();
        $form = $this->createForm(UserType::class, $user, ['method' => Request::METHOD_POST]);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $user->setSignupDate(new DateTime('now'));
            $user->setSigninDate(new DateTime('now'));
            $user->addEstimation($estimation);
            $em->persist($user);
            $em->flush();

            $this->addFlash('success', 'Compte créé, félicitations à toi, rendez vous à la collecte !!');

            return $this->redirectToRoute('home');
        }

        return $this->render('user/new.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/showCollects", name="show_collect")
     * @param CollectsRepository $collectsRepository
     * @param OrganismsRepository $organismsRepository
     * @return Response
     */
    public function searchCollect(CollectsRepository $collectsRepository, OrganismsRepository $organismsRepository)
    {
        $organism = $this->getUser()->getOrganism();
        if ($organism !== null) {
            $repo = $collectsRepository->findBy(['collector' => $organism->getId()],["collector" => "ASC"]);
        } else {
          
            $publicOrganisms = $organismsRepository->findBy(['organismStatus' => 'Collecteur public']);
            $publicOrganismsId = [];

            foreach ($publicOrganisms as $publicOrganism) {
                $publicOrganismsId [] = $publicOrganism->getId();
            }

            $repo = $collectsRepository->findBy(['collector' => $publicOrganismsId],["collector" => "ASC"]);
        }

        return $this->render('user/showCollect.html.twig', [
            'collects' => $repo,
            'collector' => $organism
        ]);
    }

    /**
     * @Route("/choice/{collect}", name="choice")
     * @ParamConverter("collect" , class="App\Entity\Collects", options={"id"="collect"})
     * @param EntityManagerInterface $em
     * @param CollectsRepository $repository
     * @param Collects $collect
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function choiceCollect(EntityManagerInterface $em, CollectsRepository $repository, Collects $collect)
    {
        $user = $this->getUser();
        $collect = $repository->findOneBy(['id' => $collect]);
        $user->setCollect($collect);
        $em->persist($user);
        $em->flush();
        $this->addFlash("success", "Tu as bien été enregistré sur cette collecte.");

        return $this->redirectToRoute("home");
    }
}
